package com.example.reportservice.web;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.TestServer;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class StaticHandlerTest {

    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        StaticHandler handler = new StaticHandler();
        server = new TestServer(http -> http.createContext("/", handler));
    }

    @AfterEach
    void tearDown() {
        server.close();
    }

    @Test
    void servesTheInterfaceAtTheRootAndAsIndexHtml() throws Exception {
        HttpResponse<String> root = server.get("/");

        assertEquals(200, root.statusCode());
        assertEquals("text/html; charset=utf-8", root.headers().firstValue("Content-Type").orElse(null));
        assertTrue(root.body().contains("<title>Report Studio</title>"));
        assertEquals(root.body(), server.get("/index.html").body());
    }

    @Test
    void letsTheBrowserRevalidateAndTheManagerEmbedThePage() throws Exception {
        HttpResponse<String> response = server.get("/");

        assertEquals("no-cache", response.headers().firstValue("Cache-Control").orElse(null));
        assertEquals("nosniff", response.headers().firstValue("X-Content-Type-Options").orElse(null));
        // the manager embeds the page in an iframe, so it must not forbid framing
        assertTrue(response.headers().firstValue("X-Frame-Options").isEmpty());
    }

    @Test
    void servesEveryFileThatTheIndexPageUses() throws Exception {
        List<String> files = new ArrayList<>();
        Matcher reference = Pattern.compile("(?:src|href)=\"([^\"]+)\"").matcher(server.get("/").body());
        while (reference.find()) {
            if (!reference.group(1).startsWith("data:")) {
                files.add("/" + reference.group(1));
            }
        }

        List<String> required = List.of("/vendor/or-theme.css", "/css/app.css", "/js/main.js",
                "/vendor/gridstack-all.js", "/vendor/echarts.min.js", "/vendor/gauge.min.js");
        assertTrue(files.containsAll(required), files.toString());
        for (String file : files) {
            HttpResponse<String> response = server.get(file);
            assertEquals(200, response.statusCode(), file);
            String type = response.headers().firstValue("Content-Type").orElse("");
            assertTrue(type.startsWith(file.endsWith(".css") ? "text/css" : "text/javascript"), file + " is " + type);
            assertFalse(response.body().isEmpty(), file);
        }
    }

    @Test
    void servesTheFontsOfTheTheme() throws Exception {
        List<String> fonts = new ArrayList<>();
        Matcher reference = Pattern.compile("url\\(\"\\./(fonts/[A-Za-z0-9._-]+\\.woff2)\"\\)")
                .matcher(server.get("/vendor/or-theme.css").body());
        while (reference.find()) {
            fonts.add("/vendor/" + reference.group(1));
        }

        assertFalse(fonts.isEmpty(), "the theme declares no font");
        for (String font : fonts) {
            HttpResponse<String> response = server.get(font);
            assertEquals(200, response.statusCode(), font);
            assertEquals("font/woff2", response.headers().firstValue("Content-Type").orElse(null), font);
            assertFalse(response.body().isEmpty(), font);
        }
    }

    @Test
    void servesTheModulesOfTheImportMap() throws Exception {
        assertTrue(server.get("/").body().contains("\"lit\": \"./vendor/lit.js\""));
        for (String file : List.of("/vendor/lit.js", "/js/builder/index.js", "/js/data/asset-service.js")) {
            HttpResponse<String> response = server.get(file);
            assertEquals(200, response.statusCode(), file);
            assertEquals("text/javascript; charset=utf-8", response.headers().firstValue("Content-Type").orElse(null));
        }
    }

    @Test
    void doesNotServeAFileThatItHasNoTypeFor() throws Exception {
        // the licence notes of the libraries are in the jar, but they are not part of the page
        for (String file : List.of("/vendor/gauge.min.js.LICENSE.txt", "/vendor/fonts/LICENSE.txt",
                "/vendor/README.md", "/img/plan.png", "/data.json")) {
            assertEquals(404, server.get(file).statusCode(), file);
        }
    }

    @ParameterizedTest
    @ValueSource(strings = {"/manufacturer", "/smartcity", "/master", "/my-realm_2"})
    void servesTheInterfaceAtTheAddressOfARealm(String path) throws Exception {
        HttpResponse<String> response = server.get(path);

        assertEquals(200, response.statusCode(), path);
        assertEquals("text/html; charset=utf-8", response.headers().firstValue("Content-Type").orElse(null));
        assertEquals(server.get("/").body(), response.body());
    }

    @ParameterizedTest
    @ValueSource(strings = {"/missing.html", "/js/missing.js", "/js/", "/js/main", "/static/index.html",
        "/manufacturer/", "/manufacturer/index.html"})
    void doesNotFindWhatIsNotAFileOfTheInterface(String path) throws Exception {
        HttpResponse<String> response = server.get(path);

        assertEquals(404, response.statusCode(), path);
        assertEquals("not found", TestServer.json(response).get("error").asText());
    }

    @ParameterizedTest
    @ValueSource(strings = {
        "/../build-info.properties",
        "/js/../../build-info.properties",
        "/js/../index.html",
        "/%2e%2e/build-info.properties",
        "/js/..%2f..%2fbuild-info.properties",
        "/js%5Cmain.js",
        "/js//main.js",
        "/build-info.properties",
        "/logback.xml",
        "/.hidden.js",
        "/..",
        "/.hidden",
        "/%2e%2e",
        "/%E2%82%AC", // not a name of a realm
    })
    void doesNotServeAnythingOutsideTheStaticFolder(String path) throws Exception {
        assertEquals(404, server.get(path).statusCode(), path);
    }

    @Test
    void refusesOtherMethods() throws Exception {
        HttpResponse<String> response = server.send("POST", "/");

        assertEquals(405, response.statusCode());
        assertEquals("GET", response.headers().firstValue("Allow").orElse(null));
    }
}
