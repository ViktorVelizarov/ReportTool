package com.example.reportservice.asset;

import com.example.reportservice.json.Json;
import com.example.reportservice.openremote.HttpStatusException;
import com.example.reportservice.openremote.ManagerClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Reads assets from the manager's asset API ({@code /api/{realm}/asset}) in the realm of the service user, and names
 * the realm to read in the query. Needs the {@code read:assets} role, and for a realm other than the service user's own
 * a super user: the manager refuses any other service user. {@code realm} must be a valid realm name.
 */
final class AssetClient {

    private final ManagerClient manager;

    AssetClient(ManagerClient manager) {
        this.manager = manager;
    }

    /**
     * Lists the assets of a realm in creation order.
     *
     * @param type       asset type name to filter by (subtypes included), or null for all types
     * @param attributes names of the attributes to load with each asset: none if empty, all if null
     * @param limit      maximum number of assets, 0 for no limit
     * @param offset     number of assets to skip
     */
    List<Asset> list(String realm, String type, List<String> attributes, int limit, int offset)
            throws IOException, InterruptedException {
        ObjectNode query = query(realm, type);
        if (attributes != null) {
            ArrayNode names = query.putObject("select").putArray("attributes");
            attributes.forEach(names::add);
        }
        query.putObject("orderBy").put("property", "CREATED_ON");
        if (limit > 0) query.put("limit", limit);
        if (offset > 0) query.put("offset", offset);

        return ManagerClient.convert(manager.request("POST", "/asset/query", query), new TypeReference<>() { });
    }

    /** Counts the assets matching the same filter as {@link #list}. */
    int count(String realm, String type) throws IOException, InterruptedException {
        JsonNode count = manager.request("POST", "/asset/count", query(realm, type));
        return ManagerClient.convert(count, new TypeReference<Integer>() { });
    }

    /**
     * Loads one asset of the realm with all its attributes, or returns empty if the realm has no such asset. The
     * manager gives a super user an asset of any realm by its ID, so the realm of the asset is checked. {@code assetId}
     * must be a valid asset ID.
     */
    Optional<Asset> get(String realm, String assetId) throws IOException, InterruptedException {
        try {
            JsonNode asset = manager.request("GET", "/asset/" + assetId, null);
            return Optional.of(ManagerClient.convert(asset, new TypeReference<Asset>() { }))
                    .filter(found -> realm.equals(found.realm()));
        } catch (HttpStatusException e) {
            if (e.status() == 404) {
                return Optional.empty();
            }
            throw e;
        }
    }

    /** The query for the assets of a realm, and of a type if there is one. */
    private static ObjectNode query(String realm, String type) {
        ObjectNode query = Json.object();
        query.putObject("realm").put("name", realm);
        if (type != null) query.putArray("types").add(type);
        return query;
    }
}
