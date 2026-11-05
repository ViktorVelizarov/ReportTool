package com.example.reportservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.example.reportservice.config.Config;
import com.example.reportservice.export.BrowserLocator;
import com.example.reportservice.support.FakeManager;
import com.example.reportservice.support.Pdfs;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.junit.jupiter.api.Test;

class ReportServiceTest {

    private static final HttpClient HTTP = HttpClient.newHttpClient();

    private static Config config(boolean globalService) {
        return new Config("http://manager", "http://manager/auth", "master", "id", "secret", 5000, false,
                globalService, null);
    }

    @Test
    void describesTheService() throws Exception {
        ObjectNode service = ReportService.describeService(config(false));

        assertEquals("report-service", service.get("serviceId").asText());
        assertEquals("Report Studio", service.get("label").asText());
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
            HttpServer server = ReportService.startServer(0, manager.client(), null, false);
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

    /** A report of one table widget, as the web interface posts it (see model/exports.js in the frontend). */
    private static final String REPORT = """
            {"realm":"master","width":1400,"name":"Rooms","periodId":"last7","asOf":1790000000000,
             "text":{"summary":"All rooms are as they should be."},
             "template":{"id":"rooms","columns":12,"maxScreenWidth":4000,
               "screenPresets":[{"id":"mobile","displayName":"dashboard.size.mobile","breakpoint":640,
                                 "scalingPreset":"WRAP_TO_SINGLE_COLUMN"}],
               "widgets":[{"id":"rooms-1","displayName":"Room temperatures","widgetTypeId":"table",
                 "gridItem":{"id":"rooms-1","x":0,"y":0,"w":12,"h":4,"minW":1,"minH":1,
                             "noResize":false,"noMove":false,"locked":false},
                 "widgetConfig":{"assetType":"RoomAsset","allOfType":true,"attributeNames":["temperature"]}}]}}""";

    @Test
    void makesThePdfOfAReportWithTheWebInterfaceAndTheDataOfTheManager() throws Exception {
        assumeTrue(BrowserLocator.find(null).isPresent(), "needs Chrome, Chromium or Edge");
        try (FakeManager manager = new FakeManager()
                .respond("POST /asset/query", FakeManager.ASSETS)
                .respond("POST /asset/count", "2")
                .respond("GET /model/assetInfos", FakeManager.ASSET_INFOS)) {
            HttpServer server = ReportService.startServer(0, manager.client(), null, false);
            try {
                HttpRequest request = HttpRequest.newBuilder(
                        URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/export/pdf"))
                        .POST(HttpRequest.BodyPublishers.ofString(REPORT))
                        .build();

                HttpResponse<byte[]> response = HTTP.send(request, HttpResponse.BodyHandlers.ofByteArray());

                String answer = new String(response.body(), StandardCharsets.ISO_8859_1);
                assertEquals(200, response.statusCode(), answer);
                assertEquals("application/pdf", response.headers().firstValue("Content-Type").orElse(""));
                assertTrue(Pdfs.isPdf(response.body()));
                assertEquals("Rooms", Pdfs.title(response.body()));
                assertEquals(1, Pdfs.pageCount(response.body()), "the cover, the text and the widget fit on one page");
                assertTrue(manager.calls().contains("GET /model/assetInfos"), "the page read the asset model");
                assertTrue(manager.calls().contains("POST /asset/query"), "the widget read the assets");
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
