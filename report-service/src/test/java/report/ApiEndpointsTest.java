package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.databind.JsonNode;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ApiEndpointsTest {

    private static final String ID = FakeManager.ASSET_ID;
    private static final String QUERY = "POST /asset/query";

    private FakeManager manager;
    private HttpServer server;
    private final HttpClient http = HttpClient.newHttpClient();

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond(QUERY, FakeManager.ASSETS)
                .respond("POST /asset/count", "8")
                .respond("GET /asset/" + ID, FakeManager.ASSET);
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        new ApiEndpoints(new AssetClient(manager.client())).register(server);
        server.start();
    }

    @AfterEach
    void tearDown() {
        server.stop(0);
        manager.close();
    }

    @Test
    void listsAssetsWithTotalAndWithoutAttributesByDefault() throws Exception {
        HttpResponse<String> response = get("/assets");

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
        JsonNode json = json(get("/assets?attributes=temperature,humidity"));

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
        get("/assets?attributes=*");

        assertNull(manager.lastBody(QUERY).get("select"));
    }

    @Test
    void passesFiltersToTheManager() throws Exception {
        get("/assets?type=RoomAsset&limit=5&offset=2");

        JsonNode query = manager.lastBody(QUERY);
        assertEquals("RoomAsset", query.get("types").get(0).asText());
        assertEquals(5, query.get("limit").asInt());
        assertEquals(2, query.get("offset").asInt());
    }

    @Test
    void rejectsInvalidParameters() throws Exception {
        assertEquals(400, get("/assets?limit=abc").statusCode());
        assertEquals(400, get("/assets?offset=-1").statusCode());
        assertEquals(400, get("/assets?type=Room%20Asset").statusCode());
        assertEquals(400, get("/assets?attributes=temperature,").statusCode());
        assertEquals(400, get("/assets?attributes=a-b").statusCode());
    }

    @Test
    void getsOneAssetWithAllAttributes() throws Exception {
        HttpResponse<String> response = get("/assets/" + ID);

        assertEquals(200, response.statusCode());
        JsonNode asset = json(response);
        assertEquals("Room", asset.get("name").asText());
        assertEquals(21.5, asset.get("attributes").get("temperature").get("value").asDouble());
        assertNull(asset.get("somethingNew"));
    }

    @Test
    void rejectsMalformedAssetIds() throws Exception {
        assertEquals(400, get("/assets/not-an-id").statusCode());
        assertEquals(400, get("/assets/..").statusCode());
        assertEquals(404, get("/assets/..%2Fservice").statusCode()); // an encoded slash cannot reach the manager
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void reportsAnUnknownAssetAsNotFound() throws Exception {
        manager.failOnce("GET /asset/" + ID, 404);

        HttpResponse<String> response = get("/assets/" + ID);

        assertEquals(404, response.statusCode());
        assertEquals("asset not found", json(response).get("error").asText());
    }

    @Test
    void rejectsOtherMethodsAndUnknownPaths() throws Exception {
        HttpResponse<String> post = send("POST", "/assets");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));

        assertEquals(404, get("/assets/" + ID + "/nope/nope").statusCode());
    }

    @Test
    void reportsManagerFailuresAsBadGateway() throws Exception {
        manager.failOnce("POST /asset/count", 403);

        HttpResponse<String> response = get("/assets");

        assertEquals(502, response.statusCode());
        assertTrue(json(response).get("error").asText().contains("403"));
    }

    @Test
    void reportsUnexpectedManagerResponsesAsBadGateway() throws Exception {
        manager.respond(QUERY, "{}");

        assertEquals(502, get("/assets").statusCode());
    }

    private HttpResponse<String> get(String path) throws IOException, InterruptedException {
        return send("GET", path);
    }

    private HttpResponse<String> send(String method, String path) throws IOException, InterruptedException {
        URI uri = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + path);
        HttpRequest request = HttpRequest.newBuilder(uri)
                .method(method, HttpRequest.BodyPublishers.noBody())
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }

    private static JsonNode json(HttpResponse<String> response) throws IOException {
        return ManagerClient.MAPPER.readTree(response.body());
    }
}
