package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static report.TestServer.json;

import com.fasterxml.jackson.databind.JsonNode;

import java.net.http.HttpResponse;
import java.time.Instant;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ApiEndpointsTest {

    private static final String ID = FakeManager.ASSET_ID;
    private static final String QUERY = "POST /asset/query";
    private static final String POINTS = "POST /asset/datapoint/" + ID + "/temperature";
    private static final String PERIOD = "GET /asset/datapoint/periods";
    private static final String POINTS_URL = "/assets/" + ID + "/attributes/temperature/datapoints";

    private FakeManager manager;
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond(QUERY, FakeManager.ASSETS)
                .respond("POST /asset/count", "8")
                .respond("GET /asset/" + ID, FakeManager.ASSET)
                .respond(POINTS, "[{\"x\":2000,\"y\":21.5},{\"x\":1000,\"y\":null}]");
        server = new TestServer(http -> new ApiEndpoints(manager.client()).register(http));
    }

    @AfterEach
    void tearDown() {
        server.close();
        manager.close();
    }

    // assets

    @Test
    void listsAssetsWithTotalAndWithoutAttributesByDefault() throws Exception {
        HttpResponse<String> response = server.get("/assets");

        assertEquals(200, response.statusCode());
        assertTrue(response.headers().firstValue("Content-Type").orElse("").startsWith("application/json"));
        JsonNode json = json(response);
        assertEquals(8, json.get("total").asInt());
        assertEquals(2, json.get("assets").size());
        assertEquals(ID, json.get("assets").get(0).get("id").asText());
        assertEquals(0, manager.lastBody(QUERY).get("select").get("attributes").size());
    }

    @Test
    void includesTheRequestedAttributes() throws Exception {
        JsonNode json = json(server.get("/assets?attributes=temperature,humidity"));

        JsonNode names = manager.lastBody(QUERY).get("select").get("attributes");
        assertEquals("temperature", names.get(0).asText());
        assertEquals("humidity", names.get(1).asText());
        JsonNode temperature = json.get("assets").get(0).get("attributes").get("temperature");
        assertEquals("number", temperature.get("type").asText());
        assertEquals(21.5, temperature.get("value").asDouble());
        assertEquals(1700000000000L, temperature.get("timestamp").asLong());
        assertEquals("celsius", temperature.get("meta").get("units").get(0).asText());
        assertNull(json.get("assets").get(1).get("attributes"));
    }

    @Test
    void includesAllAttributesForAStar() throws Exception {
        server.get("/assets?attributes=*");

        assertNull(manager.lastBody(QUERY).get("select"));
    }

    @Test
    void passesFiltersToTheManager() throws Exception {
        server.get("/assets?type=RoomAsset&limit=5&offset=2");

        JsonNode query = manager.lastBody(QUERY);
        assertEquals("RoomAsset", query.get("types").get(0).asText());
        assertEquals(5, query.get("limit").asInt());
        assertEquals(2, query.get("offset").asInt());
    }

    @Test
    void rejectsInvalidParameters() throws Exception {
        assertEquals(400, server.get("/assets?limit=abc").statusCode());
        assertEquals(400, server.get("/assets?offset=-1").statusCode());
        assertEquals(400, server.get("/assets?type=Room%20Asset").statusCode());
        assertEquals(400, server.get("/assets?attributes=temperature,").statusCode());
        assertEquals(400, server.get("/assets?attributes=a-b").statusCode());
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void getsOneAssetWithAllAttributes() throws Exception {
        HttpResponse<String> response = server.get("/assets/" + ID);

        assertEquals(200, response.statusCode());
        JsonNode asset = json(response);
        assertEquals("Room", asset.get("name").asText());
        assertEquals(21.5, asset.get("attributes").get("temperature").get("value").asDouble());
        assertNull(asset.get("somethingNew"));
    }

    @Test
    void rejectsMalformedAssetIds() throws Exception {
        assertEquals(400, server.get("/assets/not-an-id").statusCode());
        assertEquals(400, server.get("/assets/..").statusCode());
        assertEquals(404, server.get("/assets/..%2Fservice").statusCode()); // an encoded slash cannot reach the manager
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void reportsAnUnknownAssetAsNotFound() throws Exception {
        manager.failOnce("GET /asset/" + ID, 404);

        HttpResponse<String> response = server.get("/assets/" + ID);

        assertEquals(404, response.statusCode());
        assertEquals("asset not found", json(response).get("error").asText());
    }

    @Test
    void rejectsOtherMethodsAndUnknownPaths() throws Exception {
        HttpResponse<String> post = server.send("POST", "/assets");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));

        assertEquals(404, server.get("/assets/" + ID + "/nope/nope").statusCode());
    }

    @Test
    void reportsManagerFailuresAsBadGateway() throws Exception {
        manager.failOnce("POST /asset/count", 403);

        HttpResponse<String> response = server.get("/assets");

        assertEquals(502, response.statusCode());
        assertTrue(json(response).get("error").asText().contains("403"));
    }

    @Test
    void reportsUnexpectedManagerResponsesAsBadGateway() throws Exception {
        manager.respond(QUERY, "{}");

        assertEquals(502, server.get("/assets").statusCode());
    }

    // data points

    @Test
    void returnsAllDatapointsInARange() throws Exception {
        HttpResponse<String> response = server.get(POINTS_URL + "?from=1000&to=3000");

        assertEquals(200, response.statusCode());
        JsonNode json = json(response);
        assertEquals(2, json.size());
        assertEquals(2000, json.get(0).get("timestamp").asLong());
        assertEquals(21.5, json.get(0).get("value").asDouble());
        assertTrue(json.get(1).get("value").isNull());

        JsonNode query = manager.lastBody(POINTS);
        assertEquals("all", query.get("type").asText());
        assertEquals(1000, query.get("fromTimestamp").asLong());
        assertEquals(3000, query.get("toTimestamp").asLong());
    }

    @Test
    void acceptsIsoTimestampsWithAnOffset() throws Exception {
        long midnight = Instant.parse("2026-01-01T00:00:00Z").toEpochMilli();

        server.get(POINTS_URL + "?from=2026-01-01T00:00:00Z&to=2026-01-02T00:00:00Z");
        assertEquals(midnight, manager.lastBody(POINTS).get("fromTimestamp").asLong());
        assertEquals(midnight + 24 * 3_600_000, manager.lastBody(POINTS).get("toTimestamp").asLong());

        server.get(POINTS_URL + "?from=2026-01-01T02:00:00%2B02:00&to=2026-01-01T03:00:00%2B02:00");
        assertEquals(midnight, manager.lastBody(POINTS).get("fromTimestamp").asLong());

        // an unencoded '+' arrives as a space
        server.get(POINTS_URL + "?from=2026-01-01T02:00:00+02:00&to=2026-01-01T03:00:00+02:00");
        assertEquals(midnight, manager.lastBody(POINTS).get("fromTimestamp").asLong());
    }

    @Test
    void rangeEndsNowByDefault() throws Exception {
        long before = System.currentTimeMillis();
        server.get(POINTS_URL + "?from=1000");
        long after = System.currentTimeMillis();

        long to = manager.lastBody(POINTS).get("toTimestamp").asLong();
        assertTrue(to >= before && to <= after);
    }

    @Test
    void rejectsInvalidDatapointParameters() throws Exception {
        assertEquals(400, server.get(POINTS_URL).statusCode()); // from is required
        assertEquals(400, server.get(POINTS_URL + "?from=yesterday").statusCode());
        assertEquals(400, server.get(POINTS_URL + "?from=1&to=soon").statusCode());
        assertEquals(400, server.get(POINTS_URL + "?from=2026-01-01T00:00:00").statusCode()); // no offset
        assertEquals(400, server.get(POINTS_URL + "?from=2000&to=1000").statusCode());
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void rejectsMalformedIdsAndNamesForDatapoints() throws Exception {
        assertEquals(400, server.get("/assets/not-an-id/attributes/temperature/datapoints?from=1").statusCode());
        assertEquals(400, server.get("/assets/" + ID + "/attributes/not-a-name/datapoints?from=1").statusCode());
        assertEquals(400, server.get("/assets/not-an-id/attributes/temperature/datapoints/period").statusCode());
        assertEquals(400, server.get("/assets/" + ID + "/attributes/../datapoints/period").statusCode());
        assertTrue(manager.calls().isEmpty());
    }

    @Test
    void explainsDatapointErrorsFromTheManager() throws Exception {
        manager.failOnce(POINTS, 413);
        HttpResponse<String> tooLarge = server.get(POINTS_URL + "?from=1");
        assertEquals(413, tooLarge.statusCode());
        assertTrue(json(tooLarge).get("error").asText().contains("shorter range"));

        manager.failOnce(POINTS, 404);
        HttpResponse<String> missing = server.get(POINTS_URL + "?from=1");
        assertEquals(404, missing.statusCode());
        assertTrue(json(missing).get("error").asText().contains("not found"));

        manager.failOnce(PERIOD, 404);
        assertEquals(404, server.get(POINTS_URL + "/period").statusCode());

        manager.failOnce(POINTS, 403); // the service user may not read it: not the caller's mistake
        assertEquals(502, server.get(POINTS_URL + "?from=1").statusCode());
    }

    @Test
    void returnsTheDatapointPeriod() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\","
                + "\"oldestTimestamp\":1000,\"latestTimestamp\":2000}");

        JsonNode json = json(server.get(POINTS_URL + "/period"));

        assertEquals(1000, json.get("oldestTimestamp").asLong());
        assertEquals(2000, json.get("latestTimestamp").asLong());
        assertEquals("assetId=" + ID + "&attributeName=temperature", manager.lastQuery(PERIOD));
    }

    @Test
    void returnsNullTimestampsWhenThereAreNoDatapoints() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\"}");

        JsonNode json = json(server.get(POINTS_URL + "/period"));

        assertTrue(json.get("oldestTimestamp").isNull());
        assertTrue(json.get("latestTimestamp").isNull());
    }
}
