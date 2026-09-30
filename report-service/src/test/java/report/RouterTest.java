package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.databind.JsonNode;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RouterTest {

    private HttpServer server;
    private final HttpClient http = HttpClient.newHttpClient();

    @BeforeEach
    void setUp() throws Exception {
        Router router = new Router();
        router.get("/things/{id}", request -> Map.of("id", request.path("id")));
        router.get("/things/{id}/parts/{part}",
                request -> Map.of("id", request.path("id"), "part", request.path("part")));
        router.get("/query", request -> Map.of(
                "a", String.valueOf(request.query("a")),
                "b", String.valueOf(request.query("b")),
                "n", request.intQuery("n", 7, 1, 9)));
        router.get("/fail/api", request -> { throw new ApiException(418, "teapot"); });
        router.get("/fail/manager-403", request -> { throw new HttpStatusException(403, "secret detail".getBytes()); });
        router.get("/fail/io", request -> { throw new IOException("connection refused"); });
        router.get("/fail/bug", request -> { throw new IllegalStateException("internal detail"); });
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        router.register(server);
        server.start();
    }

    @AfterEach
    void tearDown() {
        server.stop(0);
    }

    @Test
    void capturesPathParameters() throws Exception {
        assertEquals("abc", json(get("/things/abc")).get("id").asText());

        JsonNode nested = json(get("/things/abc/parts/wheel"));
        assertEquals("abc", nested.get("id").asText());
        assertEquals("wheel", nested.get("part").asText());
    }

    @Test
    void decodesPathParametersButNeverLetsASlashIntoOne() throws Exception {
        assertEquals("a b", json(get("/things/a%20b")).get("id").asText());
        assertEquals(404, get("/things/a%2Fb").statusCode());
    }

    @Test
    void readsQueryParameters() throws Exception {
        JsonNode json = json(get("/query?a=x%20y&b=1%2B1&n=3"));

        assertEquals("x y", json.get("a").asText());
        assertEquals("1+1", json.get("b").asText());
        assertEquals(3, json.get("n").asInt());
        assertEquals("null", json(get("/query?a=")).get("a").asText()); // an empty parameter counts as absent
        assertEquals(7, json(get("/query")).get("n").asInt());
    }

    @Test
    void rejectsIntegersOutOfRange() throws Exception {
        assertEquals(400, get("/query?n=0").statusCode());
        assertEquals(400, get("/query?n=10").statusCode());
        assertEquals(400, get("/query?n=x").statusCode());
    }

    @Test
    void answersNotFoundAndMethodNotAllowed() throws Exception {
        assertEquals(404, get("/things").statusCode());
        assertEquals(404, get("/things/").statusCode());
        assertEquals(404, get("/things/a/b").statusCode());

        HttpResponse<String> post = send("POST", "/things/abc");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));
    }

    @Test
    void usesTheStatusOfAnApiException() throws Exception {
        HttpResponse<String> response = get("/fail/api");

        assertEquals(418, response.statusCode());
        assertEquals("teapot", json(response).get("error").asText());
    }

    @Test
    void reportsFailedManagerCallsAsBadGateway() throws Exception {
        HttpResponse<String> refused = get("/fail/manager-403");
        assertEquals(502, refused.statusCode());
        assertTrue(json(refused).get("error").asText().contains("403"));

        assertEquals(502, get("/fail/io").statusCode());
    }

    @Test
    void reportsBugsAsInternalErrorsWithoutDetails() throws Exception {
        HttpResponse<String> response = get("/fail/bug");

        assertEquals(500, response.statusCode());
        assertFalse(response.body().contains("internal detail"));
        assertTrue(json(response).get("error").asText().contains("internal error"));
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
