package com.example.reportservice.asset;

import com.example.reportservice.openremote.Ids;
import com.example.reportservice.openremote.ManagerClient;
import com.example.reportservice.web.ApiException;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * The asset endpoints: {@code GET /assets} and {@code GET /assets/{id}}. Both read the realm of the {@code realm} query
 * parameter, or the realm of the service user if there is none.
 */
public final class AssetEndpoints {

    private final ManagerClient manager;
    private final AssetClient assets;

    public AssetEndpoints(ManagerClient manager) {
        this.manager = manager;
        this.assets = new AssetClient(manager);
    }

    public void register(Router router) {
        router.get("/assets", this::listAssets);
        router.get("/assets/{id}", this::getAsset);
    }

    /**
     * {@code GET /assets?realm=&type=&attributes=&limit=&offset=}. {@code attributes} is a comma separated list of
     * attribute names to include, or {@code *} for all of them; without it no attributes are included.
     */
    private Object listAssets(Request request) throws IOException, InterruptedException {
        String realm = request.query("realm", Ids.REALM, "realm", manager.realm());
        String type = request.query("type", Ids.NAME, "type");
        List<String> attributes = attributeSelection(request.query("attributes"));
        int limit = request.nonNegativeIntQuery("limit");
        int offset = request.nonNegativeIntQuery("offset");
        return new AssetList(assets.count(realm, type), assets.list(realm, type, attributes, limit, offset));
    }

    /** @param total number of assets matching the filter, ignoring limit and offset */
    private record AssetList(int total, List<Asset> assets) { }

    /** {@code GET /assets/{id}?realm=}: the asset with all its attributes. */
    private Object getAsset(Request request) throws IOException, InterruptedException {
        String realm = request.query("realm", Ids.REALM, "realm", manager.realm());
        String id = request.path("id", Ids.ASSET_ID, "asset id");
        return assets.get(realm, id).orElseThrow(() -> new ApiException(404, "asset not found"));
    }

    /** The attributes to load: none if not given, all (null) for {@code *}, else the listed names. */
    private static List<String> attributeSelection(String value) {
        if (value == null) return List.of();
        if (value.equals("*")) return null;
        return Arrays.stream(value.split(",", -1))
                .map(name -> Request.require(Ids.NAME, name, "attribute name"))
                .toList();
    }
}
