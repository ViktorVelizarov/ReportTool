package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssetClientTest {

    private static final String QUERY = "POST /asset/query";

    private FakeManager manager;
    private AssetClient assets;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond(QUERY, FakeManager.ASSETS)
                .respond("POST /asset/count", "8")
                .respond("GET /asset/" + FakeManager.ASSET_ID, FakeManager.ASSET);
        assets = new AssetClient(manager.client());
    }

    @AfterEach
    void tearDown() {
        manager.close();
    }

    @Test
    void listsAssetsWithTheirAttributes() throws Exception {
        List<Asset> result = assets.list(null, null, 0, 0);

        assertEquals(2, result.size());
        Asset room = result.get(0);
        assertEquals(FakeManager.ASSET_ID, room.id());
        assertEquals("RoomAsset", room.type());
        assertNull(room.parentId());
        assertEquals(List.of(FakeManager.ASSET_ID), room.path());
        assertEquals(1000L, room.createdOn());

        Attribute temperature = room.attributes().get("temperature");
        assertEquals("number", temperature.type());
        assertEquals(21.5, temperature.value().asDouble());
        assertEquals(1700000000000L, temperature.timestamp());
        assertEquals("celsius", temperature.meta().get("units").get(0).asText());
        assertEquals(true, temperature.meta().get("storeDataPoints").asBoolean());

        assertEquals(FakeManager.ASSET_ID, result.get(1).parentId());
        assertNull(result.get(1).attributes());
    }

    @Test
    void loadsAllAttributesWhenNoneAreSelected() throws Exception {
        assets.list(null, null, 0, 0);

        JsonNode query = manager.lastBody(QUERY);
        assertNull(query.get("select"));
        assertEquals("CREATED_ON", query.get("orderBy").get("property").asText());
        assertNull(query.get("types"));
        assertNull(query.get("limit"));
        assertNull(query.get("offset"));
    }

    @Test
    void loadsNoAttributesForAnEmptySelection() throws Exception {
        assets.list(null, List.of(), 0, 0);

        assertEquals(0, manager.lastBody(QUERY).get("select").get("attributes").size());
    }

    @Test
    void loadsOnlyTheNamedAttributes() throws Exception {
        assets.list(null, List.of("temperature", "humidity"), 0, 0);

        JsonNode names = manager.lastBody(QUERY).get("select").get("attributes");
        assertEquals(List.of("temperature", "humidity"), List.of(names.get(0).asText(), names.get(1).asText()));
        assertEquals(2, names.size());
    }

    @Test
    void sendsTypeLimitAndOffset() throws Exception {
        assets.list("ThingAsset", List.of(), 50, 100);

        JsonNode query = manager.lastBody(QUERY);
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
    void getsOneAssetWithAllAttributes() throws Exception {
        Asset room = assets.get(FakeManager.ASSET_ID).orElseThrow();

        assertEquals("Room", room.name());
        assertNotNull(room.attributes().get("temperature"));
    }

    @Test
    void getsNothingForAnUnknownAsset() throws Exception {
        manager.failOnce("GET /asset/" + FakeManager.ASSET_ID, 404);

        assertTrue(assets.get(FakeManager.ASSET_ID).isEmpty());
    }

    @Test
    void reportsOtherFailuresToGetAnAsset() {
        manager.failOnce("GET /asset/" + FakeManager.ASSET_ID, 403);

        assertEquals(403, assertThrows(HttpStatusException.class, () -> assets.get(FakeManager.ASSET_ID)).status);
    }

    @Test
    void reusesTokenUntilItExpires() throws Exception {
        assets.list(null, List.of(), 0, 0);
        assets.list(null, List.of(), 0, 0);

        assertEquals(1, manager.tokenCalls());
        assertEquals(List.of("Bearer token1", "Bearer token1"), manager.authHeaders());
    }

    @Test
    void reportsNonSuccessStatus() {
        manager.failOnce(QUERY, 403);

        HttpStatusException e = assertThrows(HttpStatusException.class, () -> assets.list(null, List.of(), 0, 0));
        assertEquals(403, e.status);
    }

    @Test
    void reportsUnexpectedResponsesAsIoErrors() {
        manager.respond(QUERY, "{}");

        assertThrows(IOException.class, () -> assets.list(null, List.of(), 0, 0));
    }

    @Test
    void reportsEmptyResponsesAsIoErrors() {
        manager.respond("GET /asset/" + FakeManager.ASSET_ID, "");
        assertThrows(IOException.class, () -> assets.get(FakeManager.ASSET_ID));

        manager.respond("POST /asset/count", "");
        assertThrows(IOException.class, () -> assets.count(null));
    }

    @Test
    void reportsAMalformedCountAsAnIoError() {
        manager.respond("POST /asset/count", "{}");

        assertThrows(IOException.class, () -> assets.count(null));
    }
}
