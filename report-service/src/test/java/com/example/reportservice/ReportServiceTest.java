package com.example.reportservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.config.Config;
import com.example.reportservice.support.FakeManager;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import org.junit.jupiter.api.Test;

class ReportServiceTest {

    private static final HttpClient HTTP = HttpClient.newHttpClient();

    private static Config config(boolean globalService) {
        return new Config("http://manager", "http://manager/auth", "master", "id", "secret", 5000, false,
                globalService);
    }

    @Test
    void describesTheService() throws Exception {
        ObjectNode service = ReportService.describeService(config(false));

        assertEquals("report-service", service.get("serviceId").asText());
        assertEquals("Reports", service.get("label").asText());
        assertEquals(BuildInfo.version(), service.get("version").asText());
        assertEquals("AVAILABLE", service.get("status").asText());
    }

    @Test
    void opensTheInterfaceAtTheRootForARealmService() throws Exception {
        assertEquals("http://localhost:5000/",
                ReportService.describeService(config(false)).get("homepageUrl").asText());
    }

    @Test
    void leavesTheRealmInTheAddressOfAGlobalServiceForTheManagerToFillIn() throws Exception {
        assertEquals("http://localhost:5000/{realm}",
                ReportService.describeService(config(true)).get("homepageUrl").asText());
    }

    @Test
    void servesTheInterfaceAndTheDataFromOneServer() throws Exception {
        try (FakeManager manager = new FakeManager()
                .respond("POST /asset/query", FakeManager.ASSETS)
                .respond("POST /asset/count", "2")
                .respond("GET /model/assetInfos", FakeManager.ASSET_INFOS)) {
            HttpServer server = ReportService.startServer(0, manager.client());
            try {
                int port = server.getAddress().getPort();

                assertTrue(get(port, "/assets").body().contains("\"total\":2"));
                assertTrue(get(port, "/model/assetInfos").body().contains("RoomAsset"));
                for (String page : List.of("/", "/manufacturer", "/smartcity")) {
                    assertPage(get(port, page), page);
                }
                // a realm that is named like an endpoint, or starts like one, still gets its page
                for (String page : List.of("/assets-demo", "/assetsx", "/model", "/models", "/model-city")) {
                    assertPage(get(port, page), page);
                }
                HttpResponse<String> script = get(port, "/js/main.js");
                assertEquals(200, script.statusCode());
                assertEquals("text/javascript; charset=utf-8", script.headers().firstValue("Content-Type").orElse(""));
                assertEquals(404, get(port, "/missing.js").statusCode());
            } finally {
                server.stop(0);
            }
        }
    }

    private static void assertPage(HttpResponse<String> response, String path) {
        assertEquals(200, response.statusCode(), path);
        assertEquals("text/html; charset=utf-8", response.headers().firstValue("Content-Type").orElse(""), path);
        assertTrue(response.body().contains("<title>Report Studio</title>"), path);
    }

    private static HttpResponse<String> get(int port, String path) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + path)).build();
        return HTTP.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
