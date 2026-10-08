package com.example.reportservice.model;

import com.example.reportservice.openremote.ManagerClient;
import com.fasterxml.jackson.core.type.TypeReference;
import java.io.IOException;
import java.util.List;

/**
 * Reads the asset model from the manager's model API ({@code /api/{realm}/model}). The model is the same in every
 * realm and needs no role, so it is read from the realm of the service user, which the service can always call.
 */
final class ModelClient {

    private final ManagerClient manager;

    ModelClient(ManagerClient manager) {
        this.manager = manager;
    }

    /** All asset types of the manager, agents included, with their attributes. */
    List<AssetTypeInfo> assetInfos() throws IOException, InterruptedException {
        return ManagerClient.convert(manager.request("GET", "/model/assetInfos", null), new TypeReference<>() { });
    }
}
