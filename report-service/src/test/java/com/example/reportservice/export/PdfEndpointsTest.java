package com.example.reportservice.export;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.ApiException;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PdfEndpointsTest {

    private static final byte[] PDF = "%PDF-1.4 a report".getBytes(StandardCharsets.US_ASCII);

    private final List<String> realms = new ArrayList<>();
    private final List<Integer> widths = new ArrayList<>();
    private final List<JsonNode> reports = new ArrayList<>();
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        server = serving((realm, width, report) -> {
            realms.add(realm);
            widths.add(width);
            reports.add(report);
            return PDF;
        });
    }

    @AfterEach
    void tearDown() {
        server.close();
    }

    private static TestServer serving(PdfRenderer renderer) throws Exception {
        Router router = new Router();
        new PdfEndpoints(renderer).register(router);
        return new TestServer(router::register);
    }

    @Test
    void makesThePdfOfThePostedReport() throws Exception {
        HttpResponse<byte[]> response = server.postForBytes("/export/pdf",
                "{\"realm\":\"manufacturer\",\"width\":1798,\"name\":\"Weekly\",\"template\":{\"widgets\":[]}}");

        assertEquals(200, response.statusCode());
        assertEquals("application/pdf", response.headers().firstValue("Content-Type").orElse(null));
        assertArrayEquals(PDF, response.body());
        assertEquals(List.of("manufacturer"), realms);
        assertEquals(List.of(1798), widths);
        assertEquals("Weekly", reports.get(0).get("name").asText());
        assertTrue(reports.get(0).get("template").get("widgets").isArray(), "the renderer gets the whole report");
    }

    @Test
    void readsTheRealmOfTheServiceUserWhenTheReportNamesNone() throws Exception {
        server.postForBytes("/export/pdf", "{\"name\":\"Weekly\"}");
        server.postForBytes("/export/pdf", "{\"realm\":null}");

        assertEquals(2, realms.size());
        assertNull(realms.get(0));
        assertNull(realms.get(1));
    }

    @Test
    void rejectsARealmThatIsNotARealmName() throws Exception {
        for (String realm : List.of("\"a/b\"", "\"../x\"", "\"\"", "\"a b\"", "{\"a\":1}", "[]")) {
            HttpResponse<String> response = server.post("/export/pdf", "{\"realm\":" + realm + "}");

            assertEquals(400, response.statusCode(), realm);
            assertEquals("invalid realm", json(response).get("error").asText(), realm);
        }
        assertTrue(realms.isEmpty());
    }

    @Test
    void laysTheReportOutInTheWidthThatItHasInPreviewOrElseInTheDefaultWidth() throws Exception {
        for (String body : List.of("{\"name\":\"Weekly\"}", "{\"width\":null}")) {
            server.postForBytes("/export/pdf", body);
        }
        for (int width : new int[] {524, 1280, 4000}) {
            server.postForBytes("/export/pdf", "{\"width\":" + width + "}");
        }

        assertEquals(List.of(1280, 1280, 524, 1280, 4000), widths);
    }

    @Test
    void rejectsAWidthThatCannotBePrinted() throws Exception {
        for (String width : List.of("523", "4001", "0", "-1280", "1280.5", "1280.0", "\"1280\"", "true", "[]",
                "99999999999")) {
            HttpResponse<String> response = server.post("/export/pdf", "{\"width\":" + width + "}");

            assertEquals(400, response.statusCode(), width);
            assertEquals("invalid width", json(response).get("error").asText(), width);
        }
        assertTrue(widths.isEmpty());
    }

    @Test
    void rejectsABodyThatIsNotAJsonObject() throws Exception {
        HttpResponse<String> response = server.post("/export/pdf", "[]");

        assertEquals(400, response.statusCode());
        assertTrue(reports.isEmpty());
    }

    @Test
    void onlyTakesPost() throws Exception {
        HttpResponse<String> response = server.get("/export/pdf");

        assertEquals(405, response.statusCode());
        assertEquals("POST", response.headers().firstValue("Allow").orElse(null));
    }

    @Test
    void passesOnWhyThePdfCouldNotBeMade() throws Exception {
        try (TestServer failing = serving((realm, width, report) -> {
            throw new ApiException(502, "The PDF could not be made: the browser stopped");
        })) {
            HttpResponse<String> response = failing.post("/export/pdf", "{}");

            assertEquals(502, response.statusCode());
            assertEquals("The PDF could not be made: the browser stopped", json(response).get("error").asText());
        }
    }

    @Test
    void saysSoWhenThereIsNoBrowserToMakeThePdfWith() throws Exception {
        try (TestServer without = serving(PdfEndpoints.UNAVAILABLE)) {
            HttpResponse<String> response = without.post("/export/pdf", "{}");

            assertEquals(503, response.statusCode());
            assertTrue(json(response).get("error").asText().contains("CHROME_PATH"));
        }
    }
}
