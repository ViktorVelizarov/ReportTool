package com.example.reportservice.datapoint;

import com.example.reportservice.openremote.HttpStatusException;
import com.example.reportservice.openremote.Ids;
import com.example.reportservice.openremote.ManagerClient;
import com.example.reportservice.web.ApiException;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.regex.Pattern;

/**
 * The data point endpoints: the stored history of an attribute. Both read the realm of the {@code realm} query
 * parameter, or the realm of the service user if there is none, and find only the assets of that realm.
 */
public final class DatapointEndpoints {

    private static final Pattern EPOCH_MILLIS = Pattern.compile("\\d{1,15}");
    private static final String NOT_FOUND = "asset or attribute not found";

    private final ManagerClient manager;
    private final DatapointClient datapoints;

    public DatapointEndpoints(ManagerClient manager) {
        this.manager = manager;
        this.datapoints = new DatapointClient(manager);
    }

    public void register(Router router) {
        router.get("/assets/{id}/attributes/{name}/datapoints", this::getDatapoints);
        router.get("/assets/{id}/attributes/{name}/datapoints/period", this::getPeriod);
    }

    /**
     * {@code GET /assets/{id}/attributes/{name}/datapoints?realm=&from=&to=}: every stored data point of the attribute
     * in the range, newest first. {@code from} is required and {@code to} defaults to now; both are included. Times are
     * epoch milliseconds or ISO-8601 timestamps with an offset.
     */
    private Object getDatapoints(Request request) throws IOException, InterruptedException {
        String realm = request.query("realm", Ids.REALM, "realm", manager.realm());
        String assetId = request.path("id", Ids.ASSET_ID, "asset id");
        String attribute = request.path("name", Ids.NAME, "attribute name");
        long from = parseTime("from", request.requiredQuery("from"));
        String toParam = request.query("to");
        long to = toParam == null ? System.currentTimeMillis() : parseTime("to", toParam);
        if (from > to) {
            throw new ApiException(400, "from must not be after to");
        }
        return explainingFailures(() -> {
            requireInRealm(realm, assetId);
            return datapoints.all(assetId, attribute, from, to);
        });
    }

    /** {@code GET /assets/{id}/attributes/{name}/datapoints/period?realm=}: when the stored history begins and ends. */
    private Object getPeriod(Request request) throws IOException, InterruptedException {
        String realm = request.query("realm", Ids.REALM, "realm", manager.realm());
        String assetId = request.path("id", Ids.ASSET_ID, "asset id");
        String attribute = request.path("name", Ids.NAME, "attribute name");
        return explainingFailures(() -> {
            requireInRealm(realm, assetId);
            return datapoints.period(assetId, attribute);
        });
    }

    /** The manager gives a super user the history of an asset of any realm; this serves only the realm asked for. */
    private void requireInRealm(String realm, String assetId) throws IOException, InterruptedException {
        if (!datapoints.inRealm(realm, assetId)) {
            throw new ApiException(404, NOT_FOUND);
        }
    }

    @FunctionalInterface
    private interface DatapointCall {
        Object run() throws IOException, InterruptedException;
    }

    /** Replaces the manager's bare 404 and 413 answers to a data point call with an explanation. */
    private static Object explainingFailures(DatapointCall call) throws IOException, InterruptedException {
        try {
            return call.run();
        } catch (HttpStatusException e) {
            if (e.status() == 404) {
                throw new ApiException(404, NOT_FOUND);
            }
            if (e.status() == 413) {
                throw new ApiException(413, "too many data points for one query: use a shorter range");
            }
            throw e;
        }
    }

    /** A time as epoch milliseconds, given as such or as an ISO-8601 timestamp with an offset. */
    private static long parseTime(String parameter, String value) {
        if (EPOCH_MILLIS.matcher(value).matches()) {
            return Long.parseLong(value);
        }
        try {
            // an unencoded '+' in an offset arrives as a space
            return OffsetDateTime.parse(value.replace(' ', '+')).toInstant().toEpochMilli();
        } catch (DateTimeParseException e) {
            throw new ApiException(400, parameter + " must be epoch milliseconds or an ISO-8601 timestamp with "
                    + "offset, e.g. 2026-01-01T00:00:00Z");
        }
    }
}
