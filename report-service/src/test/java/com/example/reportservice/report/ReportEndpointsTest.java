package com.example.reportservice.report;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class ReportEndpointsTest {

    private static final long SAVED_AT = 1_700_000_000_000L;

    /** "Zurich - water report" with an umlaut, a dash and Japanese characters; the sources of the service are ASCII. */
    private static final String UNICODE_NAME = "Z\u00fcrich \u2013 \u6c34\u306e\u5831\u544a";

    private static final String REPORT = """
            {"name":"Weekly","periodId":"last30","template":{"id":"t","widgets":[{"id":"w1"}]},
             "instructions":{"subject":"The irrigation","focus":"Low tanks"},"schedule":null}""";

    @TempDir
    Path folder;

    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        Router router = new Router();
        new ReportEndpoints(folder, Clock.fixed(Instant.ofEpochMilli(SAVED_AT), ZoneOffset.UTC), "master")
                .register(router);
        server = new TestServer(router::register);
    }

    @AfterEach
    void tearDown() {
        server.close();
    }

    private static String report(String name) {
        return "{\"name\":\"" + name + "\",\"periodId\":\"last7\",\"template\":{\"widgets\":[]}}";
    }

    /** Saves the report as a new one and gives the ID it got. */
    private String save(String path, String body) throws Exception {
        HttpResponse<String> response = server.post(path, body);
        assertEquals(200, response.statusCode(), response.body());
        return json(response).get("id").asText();
    }

    private List<String> names(String path) throws Exception {
        return json(server.get(path)).findValuesAsText("name");
    }

    @Test
    void savesAReportAndOpensItAgainWithEverythingThatWasSaved() throws Exception {
        HttpResponse<String> saved = server.post("/reports?realm=manufacturer", REPORT);

        assertEquals(200, saved.statusCode());
        JsonNode summary = json(saved);
        String id = summary.get("id").asText();
        assertEquals("Weekly", summary.get("name").asText());
        assertEquals(SAVED_AT, summary.get("updatedAt").asLong());
        assertEquals(3, summary.size(), "the answer is the summary and not the whole report");

        JsonNode opened = json(server.get("/reports/" + id + "?realm=manufacturer"));
        assertEquals(id, opened.get("id").asText());
        assertEquals("Weekly", opened.get("name").asText());
        assertEquals("last30", opened.get("periodId").asText());
        assertEquals("w1", opened.get("template").get("widgets").get(0).get("id").asText());
        assertEquals("Low tanks", opened.get("instructions").get("focus").asText());
        assertTrue(opened.get("schedule").isNull());
        assertEquals(SAVED_AT, opened.get("createdAt").asLong());
        assertEquals(SAVED_AT, opened.get("updatedAt").asLong());
    }

    @Test
    void listsTheSavedReportsOfARealmByName() throws Exception {
        assertEquals("[]", server.get("/reports?realm=manufacturer").body());
        save("/reports?realm=manufacturer", report("beta"));
        save("/reports?realm=manufacturer", report("Alpha"));
        save("/reports?realm=smartcity", report("Gamma"));

        assertEquals(List.of("Alpha", "beta"), names("/reports?realm=manufacturer"));
        assertEquals(List.of("Gamma"), names("/reports?realm=smartcity"));
        JsonNode first = json(server.get("/reports?realm=manufacturer")).get(0);
        assertEquals(3, first.size(), "a summary has no more than an ID, a name and a time");
        assertTrue(first.has("id") && first.has("name") && first.has("updatedAt"));
    }

    @Test
    void savesAReportAgainOverItselfUnderItsNewName() throws Exception {
        String id = save("/reports?realm=manufacturer", REPORT);

        HttpResponse<String> response = server.put("/reports/" + id + "?realm=manufacturer",
                REPORT.replace("Weekly", "Monthly").replace("last30", "lastMonth"));

        assertEquals(200, response.statusCode());
        assertEquals(id, json(response).get("id").asText());
        assertEquals(List.of("Monthly"), names("/reports?realm=manufacturer"));
        JsonNode opened = json(server.get("/reports/" + id + "?realm=manufacturer"));
        assertEquals("lastMonth", opened.get("periodId").asText());
    }

    @Test
    void usesTheRealmOfTheServiceUserWhenTheRequestNamesNone() throws Exception {
        String id = save("/reports", REPORT);

        assertEquals(List.of("Weekly"), names("/reports"));
        assertEquals(List.of("Weekly"), names("/reports?realm=master"));
        assertEquals(List.of(), names("/reports?realm=manufacturer"));
        assertEquals(200, server.get("/reports/" + id).statusCode());
        assertEquals(404, server.get("/reports/" + id + "?realm=manufacturer").statusCode());
        assertEquals(404, server.put("/reports/" + id + "?realm=manufacturer", REPORT).statusCode());
        assertTrue(Files.isRegularFile(folder.resolve("master").resolve(id + ".json")));
    }

    @Test
    void refusesARealmThatIsNotARealmName() throws Exception {
        String id = UUID.randomUUID().toString();
        for (String realm : List.of("a%2Fb", "..", "a%20b", "a.b")) {
            assertEquals(400, server.get("/reports?realm=" + realm).statusCode(), realm);
            assertEquals(400, server.post("/reports?realm=" + realm, REPORT).statusCode(), realm);
            assertEquals(400, server.get("/reports/" + id + "?realm=" + realm).statusCode(), realm);
            HttpResponse<String> put = server.put("/reports/" + id + "?realm=" + realm, REPORT);
            assertEquals(400, put.statusCode(), realm);
            assertEquals("invalid realm", json(put).get("error").asText(), realm);
        }
        try (Stream<Path> written = Files.list(folder)) {
            assertEquals(0, written.count(), "nothing was written");
        }
    }

    /**
     * A body with these properties, each given as JSON (a string with its quotes); one that is null is left out, and
     * {@code more} is more properties written out.
     */
    private static String body(String name, String periodId, String template, String more) {
        List<String> properties = new ArrayList<>();
        if (name != null) {
            properties.add("\"name\":" + name);
        }
        if (periodId != null) {
            properties.add("\"periodId\":" + periodId);
        }
        if (template != null) {
            properties.add("\"template\":" + template);
        }
        if (more != null) {
            properties.add(more);
        }
        return "{" + String.join(",", properties) + "}";
    }

    @Test
    void refusesWhatIsNotAReportThatCanBeOpened() throws Exception {
        String name = "\"A\"";
        String period = "\"last7\"";
        String template = "{\"widgets\":[]}";
        List<List<String>> invalid = List.of(
                List.of("invalid name", body(null, period, template, null)),
                List.of("invalid name", body("\"\"", period, template, null)),
                List.of("invalid name", body("\"   \"", period, template, null)),
                List.of("invalid name", body("5", period, template, null)),
                List.of("invalid name", body("\"" + "x".repeat(81) + "\"", period, template, null)),
                List.of("invalid name", body("\"two\\nlines\"", period, template, null)),
                List.of("invalid periodId", body(name, null, template, null)),
                List.of("invalid periodId", body(name, "\" \"", template, null)),
                List.of("invalid periodId", body(name, "7", template, null)),
                List.of("invalid template", body(name, period, null, null)),
                List.of("invalid template", body(name, period, "[]", null)),
                List.of("invalid template", body(name, period, "{}", null)),
                List.of("invalid template", body(name, period, "{\"widgets\":{}}", null)),
                List.of("invalid instructions", body(name, period, template, "\"instructions\":[]")),
                List.of("invalid schedule", body(name, period, template, "\"schedule\":\"daily\"")));
        String id = save("/reports", report("Existing"));

        for (List<String> entry : invalid) {
            HttpResponse<String> created = server.post("/reports", entry.get(1));
            HttpResponse<String> replaced = server.put("/reports/" + id, entry.get(1));

            assertEquals(400, created.statusCode(), entry.get(1));
            assertEquals(entry.get(0), json(created).get("error").asText(), entry.get(1));
            assertEquals(400, replaced.statusCode(), entry.get(1));
            assertEquals(entry.get(0), json(replaced).get("error").asText(), entry.get(1));
        }
        assertEquals(List.of("Existing"), names("/reports"), "nothing was saved or changed");
        assertEquals(400, server.post("/reports", "[]").statusCode());
    }

    @Test
    void acceptsTheLongestNameAndAReportWithoutInstructionsOrSchedule() throws Exception {
        String name = "x".repeat(80);

        String id = save("/reports", body("\"  " + name + "  \"", "\"last7\"", "{\"widgets\":[]}", null));

        JsonNode opened = json(server.get("/reports/" + id));
        assertEquals(name, opened.get("name").asText(), "the spaces around a name are not part of it");
        assertTrue(opened.get("instructions").isNull());
        assertTrue(opened.get("schedule").isNull());
    }

    @Test
    void leavesOutWhatIsNotPartOfAReportSoThatTheClientCannotChooseIt() throws Exception {
        String chosen = UUID.randomUUID().toString();
        String own = "\"id\":\"" + chosen + "\",\"createdAt\":5,\"updatedAt\":6,\"realm\":\"smartcity\",\"extra\":1";
        String id = save("/reports", body("\"Weekly\"", "\"last7\"", "{\"widgets\":[]}", own));

        JsonNode opened = json(server.get("/reports/" + id));

        assertNotEquals(chosen, id);
        assertEquals(SAVED_AT, opened.get("createdAt").asLong());
        assertEquals(SAVED_AT, opened.get("updatedAt").asLong());
        assertFalse(opened.has("extra"));
        assertFalse(opened.has("realm"));
        assertEquals(List.of(), names("/reports?realm=smartcity"));
    }

    @Test
    void answersAReportThatIsNotThereWithNotFoundAndAnIdThatIsNoIdWithBadRequest() throws Exception {
        String unknown = UUID.randomUUID().toString();

        HttpResponse<String> opened = server.get("/reports/" + unknown);
        HttpResponse<String> replaced = server.put("/reports/" + unknown, REPORT);
        assertEquals(404, opened.statusCode());
        assertEquals("report not found", json(opened).get("error").asText());
        assertEquals(404, replaced.statusCode());
        assertEquals(List.of(), names("/reports"), "a report is not made by saving over an unknown one");

        for (String id : List.of("not-an-id", "1", unknown.toUpperCase(), unknown + "x")) {
            HttpResponse<String> response = server.get("/reports/" + id);
            assertEquals(400, response.statusCode(), id);
            assertEquals("invalid report id", json(response).get("error").asText(), id);
            assertEquals(400, server.put("/reports/" + id, REPORT).statusCode(), id);
        }
    }

    @Test
    void refusesANameThatAnotherReportOfTheRealmHasAndSaysSo() throws Exception {
        save("/reports", REPORT);
        String monthly = save("/reports", report("Monthly"));

        HttpResponse<String> added = server.post("/reports", report("WEEKLY"));
        HttpResponse<String> renamed = server.put("/reports/" + monthly, report("weekly"));

        assertEquals(409, added.statusCode());
        assertEquals("a report with this name exists already", json(added).get("error").asText());
        assertEquals(409, renamed.statusCode());
        assertEquals(List.of("Monthly", "Weekly"), names("/reports"));
        assertEquals(200, server.post("/reports?realm=smartcity", report("Weekly")).statusCode());
    }

    @Test
    void keepsNamesInAnyScriptAsTheyAre() throws Exception {
        String id = save("/reports", report(UNICODE_NAME));

        assertEquals(UNICODE_NAME, json(server.get("/reports/" + id)).get("name").asText());
        assertEquals(List.of(UNICODE_NAME), names("/reports"));
    }

    @Test
    void onlyTakesTheMethodsThatItsPathsHave() throws Exception {
        String id = save("/reports", REPORT);

        HttpResponse<String> deleted = server.send("DELETE", "/reports/" + id);
        HttpResponse<String> put = server.put("/reports", REPORT);

        assertEquals(405, deleted.statusCode());
        assertEquals("GET, PUT", deleted.headers().firstValue("Allow").orElse(null));
        assertEquals(405, put.statusCode());
        assertEquals("GET, POST", put.headers().firstValue("Allow").orElse(null));
        assertEquals(List.of("Weekly"), names("/reports"), "the report is still there");
    }

    @Test
    void answersInternalErrorWithoutDetailsWhenTheReportCannotBeWritten() throws Exception {
        Files.writeString(folder.resolve("manufacturer"), "a file where the folder of the realm should be");

        HttpResponse<String> response = server.post("/reports?realm=manufacturer", REPORT);

        assertEquals(500, response.statusCode());
        assertEquals("internal error", json(response).get("error").asText());
        assertFalse(response.body().contains(folder.toString()));
    }
}
