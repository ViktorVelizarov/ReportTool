package report;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Reads the stored history of asset attributes from the manager's data point API
 * ({@code /api/{realm}/asset/datapoint}). Needs the {@code read:assets} role.
 *
 * <p>Only attributes with the {@code storeDataPoints} meta item (or an agent link) have history; for other
 * attributes there are no data points. {@code assetId} and {@code attributeName} must already be valid (see
 * {@link ApiEndpoints}).
 *
 * <p>The methods throw {@link HttpStatusException}: 404 for an unknown asset or attribute, 413 if the result would
 * exceed the manager's limit for one query.
 */
final class DatapointClient {

    private final ManagerClient manager;

    DatapointClient(ManagerClient manager) {
        this.manager = manager;
    }

    DatapointPeriod period(String assetId, String attributeName) throws IOException, InterruptedException {
        String path = "/asset/datapoint/periods?assetId=" + assetId + "&attributeName=" + attributeName;
        return ManagerClient.convert(manager.request("GET", path, null), new TypeReference<>() { });
    }

    /** Every data point from {@code from} to {@code to} (Unix milliseconds, both included), newest first. */
    List<Datapoint> all(String assetId, String attributeName, long from, long to)
            throws IOException, InterruptedException {
        ObjectNode query = ManagerClient.MAPPER.createObjectNode()
                .put("type", "all")
                .put("fromTimestamp", from)
                .put("toTimestamp", to);
        JsonNode points = manager.request("POST", "/asset/datapoint/" + assetId + "/" + attributeName, query);
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
