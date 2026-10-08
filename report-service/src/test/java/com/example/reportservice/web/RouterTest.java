package com.example.reportservice.web;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.TestServer;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RouterTest {

    private static final Pattern LOWERCASE = Pattern.compile("[a-z]+");

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
        router.get("/choice", request -> Map.of("value", request.query("value", LOWERCASE, "value", "home")));
        router.get("/fail/api", request -> { throw new ApiException(418, "teapot"); });
        router.get("/fail/io", request -> { throw new IOException("connection refused"); });
        router.get("/fail/io-without-message", request -> { throw new IOException(); });
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
    void usesTheFallbackOfAnAbsentParameterAndChecksTheOneThatIsThere() throws Exception {
        assertEquals("home", json(server.get("/choice")).get("value").asText());
        assertEquals("home", json(server.get("/choice?value=")).get("value").asText());
        assertEquals("abc", json(server.get("/choice?value=abc")).get("value").asText());

        HttpResponse<String> invalid = server.get("/choice?value=A1");
        assertEquals(400, invalid.statusCode());
        assertEquals("invalid value", json(invalid).get("error").asText());
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
    void leavesEveryPathThatIsNotARouteToTheFallbackAndMatchesWholeSegments() throws Exception {
        Router router = new Router(exchange -> {
            try (exchange) {
                byte[] body = "fallback".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, body.length);
                exchange.getResponseBody().write(body);
            }
        });
        router.get("/things/{id}", request -> Map.of("id", request.path("id")));
        router.get("/stuff", request -> Map.of("stuff", true));

        try (TestServer withFallback = new TestServer(router::register)) {
            assertEquals("abc", json(withFallback.get("/things/abc")).get("id").asText());
            assertEquals("true", json(withFallback.get("/stuff")).get("stuff").asText());
            // none of these is a route, however much of it looks like one
            for (String path : List.of("/", "/other", "/things", "/things/a/b", "/things-abc", "/thingsx/abc",
                    "/stuffed", "/stuff-demo", "/stuff/more")) {
                assertEquals("fallback", withFallback.get(path).body(), path);
            }
        }
    }

    @Test
    void usesTheStatusOfAnApiException() throws Exception {
        HttpResponse<String> response = server.get("/fail/api");

        assertEquals(418, response.statusCode());
        assertEquals("teapot", json(response).get("error").asText());
    }

    @Test
    void reportsIoFailuresAsBadGateway() throws Exception {
        HttpResponse<String> refused = server.get("/fail/io");
        assertEquals(502, refused.statusCode());
        assertEquals("OpenRemote request failed: connection refused", json(refused).get("error").asText());

        HttpResponse<String> silent = server.get("/fail/io-without-message");
        assertEquals(502, silent.statusCode());
        assertEquals("OpenRemote request failed: IOException", json(silent).get("error").asText());
    }

    @Test
    void reportsBugsAsInternalErrorsWithoutDetails() throws Exception {
        HttpResponse<String> response = server.get("/fail/bug");

        assertEquals(500, response.statusCode());
        assertFalse(response.body().contains("internal detail"));
        assertTrue(json(response).get("error").asText().contains("internal error"));
    }
}
