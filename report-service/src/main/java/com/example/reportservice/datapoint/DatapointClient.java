package com.example.reportservice.datapoint;

import com.example.reportservice.json.Json;
import com.example.reportservice.openremote.ManagerClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Reads the stored history of asset attributes from the manager's data point API
 * ({@code /api/{realm}/asset/datapoint}) in the realm of the service user. Needs the {@code read:assets} role.
 *
 * <p>The data point API knows assets by their ID alone, and gives a super user the history of an asset of any realm,
 * so {@link #inRealm} tells whether an asset is in the realm that is being read.
 *
 * <p>Only attributes with the {@code storeDataPoints} meta item (or an agent link) have history; for other
 * attributes there are no data points. {@code realm}, {@code assetId} and {@code attributeName} must already be valid
 * (see {@link DatapointEndpoints}).
 *
 * <p>The methods throw {@link com.example.reportservice.openremote.HttpStatusException}: 404 for an unknown asset or
 * attribute, 413 if the result would exceed the manager's limit for one query.
 */
final class DatapointClient {

    private final ManagerClient manager;

    DatapointClient(ManagerClient manager) {
        this.manager = manager;
    }

    /** Whether the realm has the asset. The manager refuses a service user that may not read the realm. */
    boolean inRealm(String realm, String assetId) throws IOException, InterruptedException {
        ObjectNode query = Json.object();
        query.putObject("realm").put("name", realm);
        query.putArray("ids").add(assetId);
        query.putObject("select").putArray("attributes"); // the asset itself is enough
        JsonNode found = manager.request("POST", "/asset/query", query);
        if (found == null || !found.isArray()) {
            throw new IOException("Unexpected response to the asset query");
        }
        return !found.isEmpty();
    }

    DatapointPeriod period(String assetId, String attributeName) throws IOException, InterruptedException {
        String path = "/asset/datapoint/periods?assetId=" + assetId + "&attributeName=" + attributeName;
        return ManagerClient.convert(manager.request("GET", path, null), new TypeReference<>() { });
    }

    /** Every data point from {@code from} to {@code to} (Unix milliseconds, both included), newest first. */
    List<Datapoint> all(String assetId, String attributeName, long from, long to)
            throws IOException, InterruptedException {
        ObjectNode query = Json.object()
                .put("type", "all")
                .put("fromTimestamp", from)
                .put("toTimestamp", to);
        return datapoints(manager.request("POST", "/asset/datapoint/" + assetId + "/" + attributeName, query));
    }

    /**
     * The data points from {@code from} to {@code to} (Unix milliseconds, both included) made into one point per
     * interval, oldest first, as the manager's interval query gives them: the point is at the start of the interval and
     * has the value that the formula ({@code MIN}, {@code AVG}, {@code MAX}, {@code DIFFERENCE}, {@code COUNT},
     * {@code SUM}, {@code MODE} or {@code MEDIAN}) makes of the data points in it. The manager lines the intervals up
     * on the clock of its own time zone: a day starts at its midnight, a week on its Monday and a month on its first.
     * With {@code gapFill} an interval without data points is a point as well, with no value (except for {@code MODE},
     * which has no point for it). {@code interval} is an amount and a unit, such as "1 hour".
     *
     * @throws com.example.reportservice.openremote.HttpStatusException 400 for an attribute that is not a number or a
     *         flag, or a {@code DIFFERENCE} of a flag
     */
    List<Datapoint> interval(String assetId, String attributeName, long from, long to, String interval,
                             String formula, boolean gapFill) throws IOException, InterruptedException {
        ObjectNode query = Json.object()
                .put("type", "interval")
                .put("fromTimestamp", from)
                .put("toTimestamp", to)
                .put("interval", interval)
                .put("formula", formula)
                .put("gapFill", gapFill);
        return datapoints(manager.request("POST", "/asset/datapoint/" + assetId + "/" + attributeName, query));
    }

    private static List<Datapoint> datapoints(JsonNode points) throws IOException {
        if (points == null || !points.isArray()) {
            throw new IOException("Unexpected response to the data point query");
        }
        List<Datapoint> result = new ArrayList<>(points.size());
        for (JsonNode point : points) {
            if (!point.hasNonNull("x")) {
                throw new IOException("Unexpected data point in the response to the data point query");
            }
            result.add(new Datapoint(point.get("x").asLong(), point.get("y"))); // the manager calls these x and y
        }
        return result;
    }
}
