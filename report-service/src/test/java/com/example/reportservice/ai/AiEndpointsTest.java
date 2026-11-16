package com.example.reportservice.ai;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.config.AiSettings;
import com.example.reportservice.support.FakeManager;
import com.example.reportservice.support.FakeModel;
import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AiEndpointsTest {

    private static final String PROMPT = "{\"system\":\"The rules.\",\"user\":\"The figures.\",\"descriptions\":3}";

    private final AtomicReference<Instant> now = new AtomicReference<>(Instant.parse("2026-11-16T12:00:00Z"));
    private FakeModel model;
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        model = new FakeModel();
        start(new AiSettings(model.baseUrl(), "writer-1", "sk-123", Duration.ofSeconds(45)));
    }

    @AfterEach
    void tearDown() {
        server.close();
        model.close();
    }

    /** Starts the service with these settings of the model; null when AI text is not set up. */
    private void start(AiSettings settings) throws IOException {
        if (server != null) {
            server.close();
        }
        Router router = new Router();
        new AiEndpoints(settings, now::get).register(router);
        server = new TestServer(router::register);
    }

    private static String prompt(String system, String user, String descriptions) {
        return "{\"system\":" + system + ",\"user\":" + user + ",\"descriptions\":" + descriptions + "}";
    }

    @Test
    void saysThatAiTextIsNotSetUp() throws Exception {
        start(null);

        HttpResponse<String> response = server.get("/ai/status");

        assertEquals(200, response.statusCode());
        assertTrue(response.headers().firstValue("Content-Type").orElse("").startsWith("application/json"));
        assertEquals("{\"available\":false}", response.body());
    }

    @Test
    void namesTheModelAndTheHostThatTheFiguresAreSentTo() throws Exception {
        HttpResponse<String> response = server.get("/ai/status");

        assertEquals(200, response.statusCode());
        JsonNode status = json(response);
        assertTrue(status.get("available").asBoolean());
        assertEquals("writer-1", status.get("model").asText());
        assertEquals("127.0.0.1", status.get("host").asText());
        assertEquals(45, status.get("timeoutSeconds").asInt());
        assertEquals(4, status.size());
    }

    @Test
    void neverGivesTheKeyOrTheAddressOfTheApi() throws Exception {
        String body = server.get("/ai/status").body();

        assertFalse(body.contains("sk-123"));
        assertFalse(body.contains("/v1"));
    }

    @Test
    void writesTheFourKindsOfTextForThePrompt() throws Exception {
        HttpResponse<String> response = server.post("/ai/text", PROMPT);

        assertEquals(200, response.statusCode(), response.body());
        JsonNode text = json(response);
        assertEquals("This report is about the rooms.", text.get("introduction").asText());
        assertEquals("The rooms were 21.5 degrees on average.", text.get("findings").asText());
        assertEquals(3, text.get("descriptions").size());
        assertEquals("Widget 2 shows a room.", text.get("descriptions").get(1).asText());
        assertEquals("Nothing needs attention.", text.get("conclusion").asText());
        assertEquals(4, text.size());

        JsonNode messages = model.requests().get(0).get("messages");
        assertEquals("The rules.", messages.get(0).get("content").asText());
        assertEquals("The figures.", messages.get(1).get("content").asText());
    }

    @Test
    void writesTheTextOfAReportWithoutWidgets() throws Exception {
        model.answer(FakeModel.text(0));

        HttpResponse<String> response = server.post("/ai/text", prompt("\"The rules.\"", "\"The figures.\"", "0"));

        assertEquals(200, response.statusCode(), response.body());
        assertEquals(0, json(response).get("descriptions").size());
    }

    @Test
    void rejectsAPromptWithoutItsParts() throws Exception {
        for (String system : List.of("null", "\"\"", "\" \"", "12", "[\"The rules.\"]")) {
            HttpResponse<String> response = server.post("/ai/text", prompt(system, "\"The figures.\"", "3"));

            assertEquals(400, response.statusCode(), system);
            assertEquals("invalid system", json(response).get("error").asText());
        }
        assertEquals("invalid user",
                json(server.post("/ai/text", "{\"system\":\"The rules.\",\"descriptions\":3}")).get("error").asText());
        assertEquals(400, server.post("/ai/text", "[]").statusCode());
        assertTrue(model.requests().isEmpty(), "the model is not called");
    }

    @Test
    void rejectsANumberOfDescriptionsThatIsNotOne() throws Exception {
        for (String descriptions : List.of("null", "-1", "1.5", "\"3\"", "101", "3000000000")) {
            HttpResponse<String> response =
                    server.post("/ai/text", prompt("\"The rules.\"", "\"The figures.\"", descriptions));

            assertEquals(400, response.statusCode(), descriptions);
            assertEquals("invalid descriptions", json(response).get("error").asText());
        }
        assertTrue(model.requests().isEmpty(), "the model is not called");
    }

    @Test
    void rejectsAPromptThatIsTooLong() throws Exception {
        String rules = "The rules.";
        String longest = "x".repeat(AiEndpoints.MAX_PROMPT_CHARS - rules.length());

        assertEquals(200, server.post("/ai/text", prompt("\"" + rules + "\"", "\"" + longest + "\"", "3"))
                .statusCode());
        HttpResponse<String> response =
                server.post("/ai/text", prompt("\"" + rules + "\"", "\"" + longest + "x\"", "3"));

        assertEquals(413, response.statusCode());
        assertEquals("the report has too many figures for the AI", json(response).get("error").asText());
        assertEquals(1, model.requests().size(), "the model is not called for it");
    }

    @Test
    void saysSoWhenAiTextIsNotSetUp() throws Exception {
        start(null);

        HttpResponse<String> response = server.post("/ai/text", PROMPT);

        assertEquals(503, response.statusCode());
        assertEquals("AI text is not set up", json(response).get("error").asText());
    }

    @Test
    void passesOnWhyTheModelGaveNoText() throws Exception {
        model.respond(401, "{\"error\":{\"message\":\"invalid x-api-key sk-123\"}}");

        HttpResponse<String> response = server.post("/ai/text", PROMPT);

        assertEquals(502, response.statusCode());
        assertEquals("the AI service refused the key (AI_API_KEY)", json(response).get("error").asText());
        assertFalse(response.body().contains("sk-123"));
        assertFalse(response.body().contains("OpenRemote"), "it is not the manager that failed");
    }

    @Test
    void answersInTimeWhenTheModelDoesNot() throws Exception {
        start(new AiSettings(model.baseUrl(), "writer-1", null, Duration.ofMillis(300)));
        model.hold();

        HttpResponse<String> response = server.post("/ai/text", PROMPT);

        assertEquals(504, response.statusCode());
        assertTrue(json(response).get("error").asText().startsWith("the AI did not answer within "));
    }

    @Test
    void letsTwoCallsRunAtATimeAndRefusesTheThird() throws Exception {
        model.hold();
        Callable<HttpResponse<String>> call = () -> server.post("/ai/text", PROMPT);
        try (ExecutorService callers = Executors.newVirtualThreadPerTaskExecutor()) {
            Future<HttpResponse<String>> first = callers.submit(call);
            Future<HttpResponse<String>> second = callers.submit(call);
            FakeManager.await(() -> model.requests().size() == AiEndpoints.MAX_CALLS_AT_A_TIME);

            HttpResponse<String> third = server.post("/ai/text", PROMPT);

            assertEquals(429, third.statusCode());
            assertEquals("the AI is busy: try again in a moment", json(third).get("error").asText());
            assertEquals(2, model.requests().size(), "the model is not called for it");

            model.release();
            assertEquals(200, first.get().statusCode());
            assertEquals(200, second.get().statusCode());
        }
        assertEquals(200, server.post("/ai/text", PROMPT).statusCode(), "there is room again");
    }

    @Test
    void letsTenCallsStartInAMinute() throws Exception {
        for (int call = 1; call <= AiEndpoints.MAX_CALLS_PER_MINUTE; call++) {
            assertEquals(200, server.post("/ai/text", PROMPT).statusCode(), "call " + call);
        }

        HttpResponse<String> next = server.post("/ai/text", PROMPT);

        assertEquals(429, next.statusCode());
        assertEquals("the AI is busy: try again in a moment", json(next).get("error").asText());
        assertEquals(10, model.requests().size(), "the model is not called for it");

        now.updateAndGet(instant -> instant.plus(Duration.ofMinutes(1)));
        assertEquals(200, server.post("/ai/text", PROMPT).statusCode(), "a minute later");
    }

    @Test
    void aCallThatFailedLeavesRoomForTheNext() throws Exception {
        model.respond(500, "");
        for (int call = 0; call < 3; call++) {
            assertEquals(502, server.post("/ai/text", PROMPT).statusCode());
        }

        model.answer(FakeModel.text(3));

        assertEquals(200, server.post("/ai/text", PROMPT).statusCode());
    }

    @Test
    void rejectsOtherMethodsAndUnknownPaths() throws Exception {
        HttpResponse<String> post = server.send("POST", "/ai/status");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));

        HttpResponse<String> get = server.get("/ai/text");
        assertEquals(405, get.statusCode());
        assertEquals("POST", get.headers().firstValue("Allow").orElse(null));

        // not a route: the service leaves this path to the web interface, which opens the realm that is called ai
        assertEquals(404, server.get("/ai").statusCode());
        assertEquals(404, server.get("/ai/status/model").statusCode());
    }
}
