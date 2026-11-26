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
import java.util.Locale;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * The data point endpoints: the stored history of an attribute. Both read the realm of the {@code realm} query
 * parameter, or the realm of the service user if there is none, and find only the assets of that realm.
 */
public final class DatapointEndpoints {

    private static final Pattern EPOCH_MILLIS = Pattern.compile("\\d{1,15}");
    private static final String NOT_FOUND = "asset or attribute not found";
    /** An amount and a unit, as the manager's interval query wants them: "1 hour", "5 minutes". */
    private static final Pattern INTERVAL =
            Pattern.compile("[1-9]\\d{0,5} (?:minute|hour|day|week|month|year)s?", Pattern.CASE_INSENSITIVE);
    private static final Pattern FLAG = Pattern.compile("true|false");
    private static final Set<String> FORMULAS =
            Set.of("MIN", "AVG", "MAX", "DIFFERENCE", "COUNT", "SUM", "MODE", "MEDIAN");

    private final ManagerClient manager;
    private final DatapointClient datapoints;

    public DatapointEndpoints(ManagerClient manager) {
        this.manager = manager;
        this.datapoints = new DatapointClient(manager);
    }

    public void register(Router router) {
        router.get("/assets/{id}/attributes/{name}/datapoints", this::getDatapoints);
        router.get("/assets/{id}/attributes/{name}/datapoints/interval", this::getInterval);
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

    /**
     * {@code GET /assets/{id}/attributes/{name}/datapoints/interval?realm=&from=&to=&interval=&formula=&gapFill=}: the
     * data points of the range made into one point per interval, oldest first, as the manager's interval query gives
     * them (see {@link DatapointClient#interval}). {@code from}, {@code to} and the realm are as for the data points;
     * {@code interval} (required) is an amount and a unit such as {@code 1 hour}, {@code formula} (required) is one of
     * MIN, AVG, MAX, DIFFERENCE, COUNT, SUM, MODE and MEDIAN, and {@code gapFill} ({@code true} or {@code false}, the
     * default) says whether an interval without data points is a point with no value.
     */
    private Object getInterval(Request request) throws IOException, InterruptedException {
        String realm = request.query("realm", Ids.REALM, "realm", manager.realm());
        String assetId = request.path("id", Ids.ASSET_ID, "asset id");
        String attribute = request.path("name", Ids.NAME, "attribute name");
        long from = parseTime("from", request.requiredQuery("from"));
        String toParam = request.query("to");
        long to = toParam == null ? System.currentTimeMillis() : parseTime("to", toParam);
        if (from > to) {
            throw new ApiException(400, "from must not be after to");
        }
        String interval = Request.require(INTERVAL, request.requiredQuery("interval"), "interval");
        String formula = request.requiredQuery("formula").toUpperCase(Locale.ROOT);
        if (!FORMULAS.contains(formula)) {
            throw new ApiException(400, "invalid formula");
        }
        boolean gapFill = Boolean.parseBoolean(request.query("gapFill", FLAG, "gapFill", "false"));
        return explainingFailures(() -> {
            requireInRealm(realm, assetId);
            return datapoints.interval(assetId, attribute, from, to, interval, formula, gapFill);
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

    /** Replaces the manager's bare 404, 413 and 400 answers to a data point call with an explanation. */
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
            if (e.status() == 400) {
                throw new ApiException(400, "the data points cannot be made into intervals: the attribute must be a "
                        + "number or a flag, and a flag has no difference");
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
