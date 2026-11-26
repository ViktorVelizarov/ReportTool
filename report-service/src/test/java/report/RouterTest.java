package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static report.TestServer.json;

import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RouterTest {

    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        Router router = new Router();
        router.get("/things/{id}", request -> Map.of("id", request.path("id")));
        router.get("/things/{id}/parts/{part}",
                request -> Map.of("id", request.path("id"), "part", request.path("part")));
        router.get("/query", request -> Map.of(
                "a", String.valueOf(request.query("a")),
                "b", String.valueOf(request.query("b")),
                "n", request.nonNegativeIntQuery("n")));
        router.get("/fail/api", request -> { throw new ApiException(418, "teapot"); });
        router.get("/fail/manager-403", request -> { throw new HttpStatusException(403, "secret detail".getBytes()); });
        router.get("/fail/io", request -> { throw new IOException("connection refused"); });
        router.get("/fail/bug", request -> { throw new IllegalStateException("internal detail"); });
        server = new TestServer(router::register);
    }

    @AfterEach
    void tearDown() {
        server.close();
    }

    @Test
    void capturesPathParameters() throws Exception {
        assertEquals("abc", json(server.get("/things/abc")).get("id").asText());

        JsonNode nested = json(server.get("/things/abc/parts/wheel"));
        assertEquals("abc", nested.get("id").asText());
        assertEquals("wheel", nested.get("part").asText());
    }

    @Test
    void decodesPathParametersButNeverLetsASlashIntoOne() throws Exception {
        assertEquals("a b", json(server.get("/things/a%20b")).get("id").asText());
        assertEquals(404, server.get("/things/a%2Fb").statusCode());
    }

    @Test
    void readsQueryParameters() throws Exception {
        JsonNode json = json(server.get("/query?a=x%20y&b=1%2B1&n=3"));

        assertEquals("x y", json.get("a").asText());
        assertEquals("1+1", json.get("b").asText());
        assertEquals(3, json.get("n").asInt());
        assertEquals("null", json(server.get("/query?a=")).get("a").asText()); // an empty parameter counts as absent
        assertEquals(0, json(server.get("/query")).get("n").asInt());
    }

    @Test
    void rejectsIntegersThatAreNotNonNegative() throws Exception {
        assertEquals(400, server.get("/query?n=-1").statusCode());
        assertEquals(400, server.get("/query?n=1.5").statusCode());
        assertEquals(400, server.get("/query?n=x").statusCode());
    }

    @Test
    void answersNotFoundAndMethodNotAllowed() throws Exception {
        assertEquals(404, server.get("/things").statusCode());
        assertEquals(404, server.get("/things/").statusCode());
        assertEquals(404, server.get("/things/a/b").statusCode());

        HttpResponse<String> post = server.send("POST", "/things/abc");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));
    }

    @Test
    void usesTheStatusOfAnApiException() throws Exception {
        HttpResponse<String> response = server.get("/fail/api");

        assertEquals(418, response.statusCode());
        assertEquals("teapot", json(response).get("error").asText());
    }

    @Test
    void reportsFailedManagerCallsAsBadGateway() throws Exception {
        HttpResponse<String> refused = server.get("/fail/manager-403");
        assertEquals(502, refused.statusCode());
        assertTrue(json(refused).get("error").asText().contains("403"));

        assertEquals(502, server.get("/fail/io").statusCode());
    }

    @Test
    void reportsBugsAsInternalErrorsWithoutDetails() throws Exception {
        HttpResponse<String> response = server.get("/fail/bug");

        assertEquals(500, response.statusCode());
        assertFalse(response.body().contains("internal detail"));
        assertTrue(json(response).get("error").asText().contains("internal error"));
    }
}
