package com.example.reportservice.model;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.FakeManager;
import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ModelEndpointsTest {

    private static final String CALL = "GET /model/assetInfos";

    private FakeManager manager;
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager().respond(CALL, FakeManager.ASSET_INFOS);
        Router router = new Router();
        new ModelEndpoints(manager.client()).register(router);
        server = new TestServer(router::register);
    }

    @AfterEach
    void tearDown() {
        server.close();
        manager.close();
    }

    @Test
    void listsTheAssetTypesWithTheirAttributes() throws Exception {
        HttpResponse<String> response = server.get("/model/assetInfos");

        assertEquals(200, response.statusCode());
        assertTrue(response.headers().firstValue("Content-Type").orElse("").startsWith("application/json"));
        JsonNode infos = json(response);
        assertEquals(2, infos.size());

        JsonNode room = infos.get(0);
        assertEquals("asset", room.get("assetDescriptor").get("descriptorType").asText());
        assertEquals("RoomAsset", room.get("assetDescriptor").get("name").asText());
        assertEquals("door", room.get("assetDescriptor").get("icon").asText());
        assertEquals("3d85c6", room.get("assetDescriptor").get("colour").asText());
        JsonNode temperature = room.get("attributeDescriptors").get(0);
        assertEquals("temperature", temperature.get("name").asText());
        assertEquals("number", temperature.get("type").asText());
        assertEquals("celsius", temperature.get("units").get(0).asText());
        assertEquals("notes", room.get("attributeDescriptors").get(1).get("name").asText());

        assertEquals("agent", infos.get(1).get("assetDescriptor").get("descriptorType").asText());
        assertEquals(0, infos.get(1).get("attributeDescriptors").size());
    }

    @Test
    void leavesOutWhatTheInterfaceDoesNotNeed() throws Exception {
        JsonNode infos = json(server.get("/model/assetInfos"));

        JsonNode room = infos.get(0);
        assertFalse(room.has("metaItemDescriptors"));
        assertFalse(room.has("valueDescriptors"));
        JsonNode temperature = room.get("attributeDescriptors").get(0);
        assertFalse(temperature.has("optional"));
        assertFalse(temperature.has("constraints"));
        assertFalse(room.get("attributeDescriptors").get(1).has("format"));
        // without units, an icon or a colour the fields are not there, as in the manager's own answer
        assertFalse(room.get("attributeDescriptors").get(1).has("units"));
        assertFalse(infos.get(1).get("assetDescriptor").has("icon"));
        assertFalse(infos.get(1).get("assetDescriptor").has("colour"));
    }

    @Test
    void readsTheSameModelWhateverRealmIsAskedFor() throws Exception {
        assertEquals(200, server.get("/model/assetInfos?realm=smartcity").statusCode());

        assertEquals("master", manager.lastRealm(CALL));
    }

    @Test
    void reportsManagerFailuresAsBadGateway() throws Exception {
        manager.failOnce(CALL, 503);

        HttpResponse<String> response = server.get("/model/assetInfos");

        assertEquals(502, response.statusCode());
        assertTrue(json(response).get("error").asText().contains("503"));
    }

    @Test
    void reportsUnexpectedManagerResponsesAsBadGateway() throws Exception {
        manager.respond(CALL, "{}");

        assertEquals(502, server.get("/model/assetInfos").statusCode());
    }

    @Test
    void rejectsOtherMethodsAndUnknownPaths() throws Exception {
        HttpResponse<String> post = server.send("POST", "/model/assetInfos");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));

        assertEquals(404, server.get("/model").statusCode());
        assertEquals(404, server.get("/model/assetInfos/RoomAsset").statusCode());
        assertEquals(404, server.get("/model/nope").statusCode());
    }
}
