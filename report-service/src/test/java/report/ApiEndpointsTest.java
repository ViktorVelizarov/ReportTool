package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

    private FakeManager manager;
    private HttpServer server;
    private final HttpClient http = HttpClient.newHttpClient();

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager().respond("POST /asset/query", FakeManager.ASSETS).respond("POST /asset/count", "8");
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
    void listsAssetsWithTotal() throws Exception {
        HttpResponse<String> response = send("GET", "/assets");

        assertEquals(200, response.statusCode());
        assertTrue(response.headers().firstValue("Content-Type").orElse("").startsWith("application/json"));
        JsonNode json = ManagerClient.MAPPER.readTree(response.body());
        assertEquals(8, json.get("total").asInt());
        assertEquals(2, json.get("assets").size());
        assertEquals("a1", json.get("assets").get(0).get("id").asText());
    }

    @Test
    void passesFiltersToTheManager() throws Exception {
        send("GET", "/assets?type=RoomAsset&limit=5&offset=2");

        JsonNode query = manager.lastBody("POST /asset/query");
        assertEquals("RoomAsset", query.get("types").get(0).asText());
        assertEquals(5, query.get("limit").asInt());
        assertEquals(2, query.get("offset").asInt());
    }

    @Test
    void rejectsInvalidNumbers() throws Exception {
        assertEquals(400, send("GET", "/assets?limit=abc").statusCode());
        assertEquals(400, send("GET", "/assets?offset=-1").statusCode());
    }

    @Test
    void rejectsOtherMethodsAndPaths() throws Exception {
        HttpResponse<String> post = send("POST", "/assets");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));

        assertEquals(404, send("GET", "/assets/a1").statusCode());
    }

    @Test
    void reportsManagerFailuresAsBadGateway() throws Exception {
        manager.failOnce("POST /asset/count", 403);

        HttpResponse<String> response = send("GET", "/assets");

        assertEquals(502, response.statusCode());
        assertTrue(ManagerClient.MAPPER.readTree(response.body()).get("error").asText().contains("403"));
    }

    @Test
    void reportsUnexpectedManagerResponsesAsBadGateway() throws Exception {
        manager.respond("POST /asset/query", "{}");

        assertEquals(502, send("GET", "/assets").statusCode());
    }

    private HttpResponse<String> send(String method, String path) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + server.getAddress().getPort() + path))
                .method(method, HttpRequest.BodyPublishers.noBody())
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
