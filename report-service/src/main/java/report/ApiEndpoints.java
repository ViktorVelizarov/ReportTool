package report;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/** The read-only JSON endpoints that expose live OpenRemote data through this service. */
final class ApiEndpoints {

    // Asset IDs and attribute names go into manager URLs, so they are checked strictly. The ID rule is OpenRemote's own
    // (Constants.ASSET_ID_REGEXP); names are word characters, as in AttributeRef.
    private static final Pattern ASSET_ID = Pattern.compile("[0-9A-Za-z]{22}");
    private static final Pattern NAME = Pattern.compile("\\w+");

    private static final Pattern EPOCH_MILLIS = Pattern.compile("\\d{1,15}");

    private final AssetClient assets;
    private final DatapointClient datapoints;

    ApiEndpoints(ManagerClient manager) {
        this.assets = new AssetClient(manager);
        this.datapoints = new DatapointClient(manager);
    }

    void register(HttpServer server) {
        Router router = new Router();
        router.get("/assets", this::listAssets);
        router.get("/assets/{id}", this::getAsset);
        router.get("/assets/{id}/attributes/{name}/datapoints", this::getDatapoints);
        router.get("/assets/{id}/attributes/{name}/datapoints/period", this::getDatapointPeriod);
        router.register(server);
    }

    /**
     * {@code GET /assets?type=&attributes=&limit=&offset=}. {@code attributes} is a comma separated list of
     * attribute names to include, or {@code *} for all of them; without it no attributes are included.
     */
    private Object listAssets(Request request) throws IOException, InterruptedException {
        String type = request.query("type");
        if (type != null) {
            check(NAME, type, "type");
        }
        List<String> attributes = attributeSelection(request.query("attributes"));
        int limit = request.nonNegativeIntQuery("limit");
        int offset = request.nonNegativeIntQuery("offset");
        return new AssetList(assets.count(type), assets.list(type, attributes, limit, offset));
    }

    /** @param total number of assets matching the filter, ignoring limit and offset */
    private record AssetList(int total, List<Asset> assets) { }

    /** {@code GET /assets/{id}}: the asset with all its attributes. */
    private Object getAsset(Request request) throws IOException, InterruptedException {
        return assets.get(assetId(request)).orElseThrow(() -> new ApiException(404, "asset not found"));
    }

    /**
     * {@code GET /assets/{id}/attributes/{name}/datapoints?from=&to=}: every stored data point of the attribute in the
     * range, newest first. {@code from} is required and {@code to} defaults to now; both are included. Times are epoch
     * milliseconds or ISO-8601 timestamps with an offset.
     */
    private Object getDatapoints(Request request) throws IOException, InterruptedException {
        String assetId = assetId(request);
        String attribute = attributeName(request);
        long from = parseTime("from", request.requiredQuery("from"));
        String toParam = request.query("to");
        long to = toParam == null ? System.currentTimeMillis() : parseTime("to", toParam);
        if (from > to) {
            throw new ApiException(400, "from must not be after to");
        }
        return explainingFailures(() -> datapoints.all(assetId, attribute, from, to));
    }

    /** {@code GET /assets/{id}/attributes/{name}/datapoints/period}: when the stored history begins and ends. */
    private Object getDatapointPeriod(Request request) throws IOException, InterruptedException {
        String assetId = assetId(request);
        String attribute = attributeName(request);
        return explainingFailures(() -> datapoints.period(assetId, attribute));
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
            if (e.status == 404) {
                throw new ApiException(404, "asset or attribute not found");
            }
            if (e.status == 413) {
                throw new ApiException(413, "too many data points for one query: use a shorter range");
            }
            throw e;
        }
    }

    /** The attributes to load: none if not given, all (null) for {@code *}, else the listed names. */
    private static List<String> attributeSelection(String value) {
        if (value == null) return List.of();
        if (value.equals("*")) return null;
        return Arrays.stream(value.split(",", -1)).map(name -> check(NAME, name, "attribute name")).toList();
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

    private static String assetId(Request request) {
        return check(ASSET_ID, request.path("id"), "asset id");
    }

    private static String attributeName(Request request) {
        return check(NAME, request.path("name"), "attribute name");
    }

    private static String check(Pattern pattern, String value, String what) {
        if (!pattern.matcher(value).matches()) {
            throw new ApiException(400, "invalid " + what);
        }
        return value;
    }
}
