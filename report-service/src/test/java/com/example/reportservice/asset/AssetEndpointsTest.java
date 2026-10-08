package com.example.reportservice.asset;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.FakeManager;
import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpResponse;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssetEndpointsTest {

    private static final String ID = FakeManager.ASSET_ID;
    private static final String QUERY = "POST /asset/query";

    private FakeManager manager;
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond(QUERY, FakeManager.ASSETS)
                .respond("POST /asset/count", "8")
                .respond("GET /asset/" + ID, FakeManager.ASSET);
        Router router = new Router();
        new AssetEndpoints(manager.client()).register(router);
        server = new TestServer(router::register);
    }

    @AfterEach
    void tearDown() {
        server.close();
        manager.close();
    }

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

    private String queriedRealm(String call) {
        return manager.lastBody(call).get("realm").get("name").asText();
    }

    @Test
    void readsTheRealmOfTheServiceUserByDefault() throws Exception {
        server.get("/assets");

        assertEquals("master", queriedRealm(QUERY));
        assertEquals("master", queriedRealm("POST /asset/count"));

        server.get("/assets?realm=smartcity");
        assertEquals("smartcity", queriedRealm(QUERY));
        server.get("/assets?realm="); // an empty parameter counts as absent
        assertEquals("master", queriedRealm(QUERY));

        assertEquals(200, server.get("/assets/" + ID).statusCode()); // the asset of the fake is in master
    }

    @Test
    void readsTheRealmThatIsAskedFor() throws Exception {
        assertEquals(200, server.get("/assets?realm=smartcity&type=ThingAsset").statusCode());
        assertEquals("smartcity", queriedRealm(QUERY));
        assertEquals("smartcity", queriedRealm("POST /asset/count"));

        manager.respond("GET /asset/" + ID, FakeManager.inRealm(FakeManager.ASSET, "my-realm_2"));
        assertEquals(200, server.get("/assets/" + ID + "?realm=my-realm_2").statusCode());
    }

    @Test
    void callsTheManagerInTheRealmOfTheServiceUserWhicheverRealmIsRead() throws Exception {
        // the manager checks a token against the realm in the path, so a token of master is not good for another path
        server.get("/assets?realm=smartcity");
        server.get("/assets/" + ID + "?realm=master");

        assertEquals("master", manager.lastRealm(QUERY));
        assertEquals("master", manager.lastRealm("POST /asset/count"));
        assertEquals("master", manager.lastRealm("GET /asset/" + ID));
    }

    @Test
    void doesNotFindAnAssetInAnotherRealm() throws Exception {
        HttpResponse<String> response = server.get("/assets/" + ID + "?realm=smartcity"); // the asset is in master

        assertEquals(404, response.statusCode());
        assertEquals("asset not found", json(response).get("error").asText());
    }

    @Test
    void rejectsAnInvalidRealm() throws Exception {
        for (String realm : List.of("a%2Fb", "..", "a%20b", "a.b", "a%3Fb", "%E2%82%AC")) {
            assertEquals(400, server.get("/assets?realm=" + realm).statusCode(), realm);
            assertEquals(400, server.get("/assets/" + ID + "?realm=" + realm).statusCode(), realm);
        }
        assertEquals("invalid realm", json(server.get("/assets?realm=a.b")).get("error").asText());
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
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
}
