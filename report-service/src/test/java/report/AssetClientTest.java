package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssetClientTest {

    private FakeManager manager;
    private AssetClient assets;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager().respond("POST /asset/query", FakeManager.ASSETS).respond("POST /asset/count", "8");
        assets = new AssetClient(manager.client());
    }

    @AfterEach
    void tearDown() {
        manager.close();
    }

    @Test
    void listsAssetsWithoutAttributes() throws Exception {
        List<Asset> result = assets.list(null, 0, 0);

        assertEquals(2, result.size());
        assertEquals(new Asset("a1", "Room", "RoomAsset", "master", null, List.of("a1"), 1000L, 3L, false), result.get(0));
        assertEquals("a1", result.get(1).parentId());

        JsonNode query = manager.lastBody("POST /asset/query");
        assertEquals(0, query.get("select").get("attributes").size());
        assertEquals("CREATED_ON", query.get("orderBy").get("property").asText());
        assertNull(query.get("types"));
        assertNull(query.get("limit"));
        assertNull(query.get("offset"));
    }

    @Test
    void sendsTypeLimitAndOffset() throws Exception {
        assets.list("ThingAsset", 50, 100);

        JsonNode query = manager.lastBody("POST /asset/query");
        assertEquals("ThingAsset", query.get("types").get(0).asText());
        assertEquals(50, query.get("limit").asInt());
        assertEquals(100, query.get("offset").asInt());
    }

    @Test
    void countsAssetsOfType() throws Exception {
        assertEquals(8, assets.count("RoomAsset"));
        assertEquals("RoomAsset", manager.lastBody("POST /asset/count").get("types").get(0).asText());
    }

    @Test
    void reusesTokenUntilItExpires() throws Exception {
        assets.list(null, 0, 0);
        assets.list(null, 0, 0);

        assertEquals(1, manager.tokenCalls());
        assertEquals(List.of("Bearer token1", "Bearer token1"), manager.authHeaders());
    }

    @Test
    void reportsNonSuccessStatus() {
        manager.failOnce("POST /asset/query", 403);

        HttpStatusException e = assertThrows(HttpStatusException.class, () -> assets.list(null, 0, 0));
        assertEquals(403, e.status);
    }
}
