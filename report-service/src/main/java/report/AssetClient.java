package report;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/** Reads assets from the manager's asset API ({@code /api/{realm}/asset}). Needs the {@code read:assets} role. */
final class AssetClient {

    private final ManagerClient manager;

    AssetClient(ManagerClient manager) {
        this.manager = manager;
    }

    /**
     * Lists assets in creation order.
     *
     * @param type       asset type name to filter by (subtypes included), or null for all types
     * @param attributes names of the attributes to load with each asset: none if empty, all if null
     * @param limit      maximum number of assets, 0 for no limit
     * @param offset     number of assets to skip
     */
    List<Asset> list(String type, List<String> attributes, int limit, int offset)
            throws IOException, InterruptedException {
        ObjectNode query = query(type);
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
    int count(String type) throws IOException, InterruptedException {
        JsonNode count = manager.request("POST", "/asset/count", query(type));
        return ManagerClient.convert(count, new TypeReference<Integer>() { });
    }

    /**
     * Loads one asset with all its attributes, or returns empty if there is no such asset. {@code assetId} must be a
     * valid asset ID.
     */
    Optional<Asset> get(String assetId) throws IOException, InterruptedException {
        try {
            JsonNode asset = manager.request("GET", "/asset/" + assetId, null);
            return Optional.of(ManagerClient.convert(asset, new TypeReference<Asset>() { }));
        } catch (HttpStatusException e) {
            if (e.status == 404) {
                return Optional.empty();
            }
            throw e;
        }
    }

    private static ObjectNode query(String type) {
        ObjectNode query = ManagerClient.MAPPER.createObjectNode();
        if (type != null) query.putArray("types").add(type);
        return query;
    }
}
