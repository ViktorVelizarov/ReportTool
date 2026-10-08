package com.example.reportservice.model;

import com.example.reportservice.openremote.ManagerClient;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import java.io.IOException;

/**
 * The asset model endpoint: {@code GET /model/assetInfos}. The model is the same in every realm, so the endpoint has no
 * {@code realm} parameter.
 */
public final class ModelEndpoints {

    private final ModelClient model;

    public ModelEndpoints(ManagerClient manager) {
        this.model = new ModelClient(manager);
    }

    public void register(Router router) {
        router.get("/model/assetInfos", this::getAssetInfos);
    }

    /** {@code GET /model/assetInfos}: the asset types of the manager with their attributes. */
    private Object getAssetInfos(Request request) throws IOException, InterruptedException {
        return model.assetInfos();
    }
}
