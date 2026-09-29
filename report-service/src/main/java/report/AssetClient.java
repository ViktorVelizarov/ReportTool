package report;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.List;

/** Reads assets from the manager's asset API ({@code /api/{realm}/asset}). Needs the {@code read:assets} role. */
final class AssetClient {

    private final ManagerClient manager;

    AssetClient(ManagerClient manager) {
        this.manager = manager;
    }

    /**
     * Lists assets in creation order, without their attributes.
     *
     * @param type   asset type name to filter by (subtypes included), or null for all types
     * @param limit  maximum number of assets, 0 for no limit
     * @param offset number of assets to skip
     */
    List<Asset> list(String type, int limit, int offset) throws IOException, InterruptedException {
        ObjectNode query = query(type);
        query.putObject("select").putArray("attributes"); // an empty array excludes all attributes
        query.putObject("orderBy").put("property", "CREATED_ON");
        if (limit > 0) query.put("limit", limit);
        if (offset > 0) query.put("offset", offset);

        JsonNode assets = manager.request("POST", "/asset/query", query);
        try {
            return ManagerClient.MAPPER.convertValue(assets, new TypeReference<>() { });
        } catch (IllegalArgumentException e) {
            throw new IOException("Unexpected response to the asset query", e);
        }
    }

    /** Counts the assets matching the same filter as {@link #list}. */
    int count(String type) throws IOException, InterruptedException {
        return manager.request("POST", "/asset/count", query(type)).asInt();
    }

    private static ObjectNode query(String type) {
        ObjectNode query = ManagerClient.MAPPER.createObjectNode();
        if (type != null) query.putArray("types").add(type);
        return query;
    }
}
