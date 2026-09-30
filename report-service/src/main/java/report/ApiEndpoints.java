package report;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/** The read-only JSON endpoints that expose live OpenRemote data through this service. */
final class ApiEndpoints {

    // The asset ID goes into a manager URL, so it is checked strictly, with OpenRemote's own rule
    // (Constants.ASSET_ID_REGEXP). Type and attribute names are word characters, as in AttributeRef.
    private static final Pattern ASSET_ID = Pattern.compile("[0-9A-Za-z]{22}");
    private static final Pattern NAME = Pattern.compile("\\w+");

    private final AssetClient assets;

    ApiEndpoints(AssetClient assets) {
        this.assets = assets;
    }

    void register(HttpServer server) {
        Router router = new Router();
        router.get("/assets", this::listAssets);
        router.get("/assets/{id}", this::getAsset);
        router.register(server);
    }

    /**
     * {@code GET /assets?type=&attributes=&limit=&offset=}. {@code attributes} is a comma separated list of
     * attribute names to include, or {@code *} for all of them; without it no attributes are included.
     */
    private Object listAssets(Request request) throws IOException, InterruptedException {
        String type = request.query("type") == null ? null : name(request.query("type"), "type");
        List<String> attributes = attributeSelection(request.query("attributes"));
        int limit = request.intQuery("limit", 0, 0, Integer.MAX_VALUE);
        int offset = request.intQuery("offset", 0, 0, Integer.MAX_VALUE);
        return new AssetList(assets.count(type), assets.list(type, attributes, limit, offset));
    }

    /** @param total number of assets matching the filter, ignoring limit and offset */
    private record AssetList(int total, List<Asset> assets) { }

    /** {@code GET /assets/{id}}: the asset with all its attributes. */
    private Object getAsset(Request request) throws IOException, InterruptedException {
        return assets.get(assetId(request.path("id"))).orElseThrow(() -> new ApiException(404, "asset not found"));
    }

    /** The attributes to load: none if not given, all (null) for {@code *}, else the listed names. */
    private static List<String> attributeSelection(String value) {
        if (value == null) return List.of();
        if (value.equals("*")) return null;
        return Arrays.stream(value.split(",", -1)).map(attribute -> name(attribute, "attribute name")).toList();
    }

    private static String assetId(String value) {
        return check(ASSET_ID, value, "asset id");
    }

    private static String name(String value, String what) {
        return check(NAME, value, what);
    }

    private static String check(Pattern pattern, String value, String what) {
        if (value == null || !pattern.matcher(value).matches()) {
            throw new ApiException(400, "invalid " + what);
        }
        return value;
    }
}
