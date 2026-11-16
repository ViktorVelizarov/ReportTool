package com.example.reportservice.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.config.AiSettings;
import com.example.reportservice.support.FakeModel;
import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ChatClientTest {

    private static final String KEY = "sk-123";

    private FakeModel model;

    @BeforeEach
    void setUp() throws Exception {
        model = new FakeModel();
    }

    @AfterEach
    void tearDown() {
        model.close();
    }

    private ChatClient client(String key, Duration timeout) {
        return new ChatClient(new AiSettings(model.baseUrl(), "writer-1", key, timeout));
    }

    private ChatClient client() {
        return client(KEY, Duration.ofSeconds(10));
    }

    /** The failure of a call for three descriptions. */
    private ApiException failure(ChatClient client) {
        return assertThrows(ApiException.class, () -> client.write("The rules.", "The figures.", 3));
    }

    @Test
    void givesTheTextThatTheModelWrote() throws Exception {
        TextAnswer answer = client().write("The rules.", "The figures.", 3);

        assertEquals("This report is about the rooms.", answer.introduction());
        assertEquals("The rooms were 21.5 degrees on average.", answer.findings());
        assertEquals(List.of("Widget 1 shows a room.", "Widget 2 shows a room.", "Widget 3 shows a room."),
                answer.descriptions());
        assertEquals("Nothing needs attention.", answer.conclusion());
    }

    @Test
    void sendsTheModelTheTwoMessagesAndTheShapeOfTheAnswerAndNothingElse() throws Exception {
        client().write("The rules.", "The figures.", 3);

        assertEquals(1, model.requests().size(), "one call, to /v1/chat/completions");
        JsonNode request = model.requests().get(0);
        assertEquals("writer-1", request.get("model").asText());
        JsonNode messages = request.get("messages");
        assertEquals(2, messages.size());
        assertEquals("system", messages.get(0).get("role").asText());
        assertEquals("The rules.", messages.get(0).get("content").asText());
        assertEquals("user", messages.get(1).get("role").asText());
        assertEquals("The figures.", messages.get(1).get("content").asText());

        JsonNode format = request.get("response_format");
        assertEquals("json_schema", format.get("type").asText());
        assertEquals("report_text", format.get("json_schema").get("name").asText());
        assertTrue(format.get("json_schema").get("strict").asBoolean());
        JsonNode schema = format.get("json_schema").get("schema");
        assertEquals("object", schema.get("type").asText());
        assertFalse(schema.get("additionalProperties").asBoolean());
        List<String> required = new ArrayList<>();
        schema.get("required").forEach(name -> required.add(name.asText()));
        assertEquals(List.of("introduction", "findings", "descriptions", "conclusion"), required);
        for (String text : List.of("introduction", "findings", "conclusion")) {
            assertEquals("string", schema.get("properties").get(text).get("type").asText(), text);
        }
        JsonNode descriptions = schema.get("properties").get("descriptions");
        assertEquals("array", descriptions.get("type").asText());
        assertEquals("string", descriptions.get("items").get("type").asText());
        assertEquals(4, schema.get("properties").size());

        // no sampling settings, token limit or streaming: not every API accepts them
        List<String> fields = new ArrayList<>();
        request.fieldNames().forEachRemaining(fields::add);
        assertEquals(List.of("model", "messages", "response_format"), fields);
    }

    @Test
    void sendsTheKeyAsABearerTokenAndNoneWhenThereIsNone() throws Exception {
        client().write("The rules.", "The figures.", 3);
        client(null, Duration.ofSeconds(10)).write("The rules.", "The figures.", 3);

        assertEquals("Bearer sk-123", model.authHeaders().get(0));
        assertNull(model.authHeaders().get(1), "a local model needs no key");
    }

    @Test
    void failsWhenTheModelDoesNotAnswerInTime() {
        model.hold();
        Instant started = Instant.now();

        ApiException e = failure(client(KEY, Duration.ofMillis(300)));

        assertEquals(504, e.status());
        assertTrue(e.getMessage().startsWith("the AI did not answer within "), e.getMessage());
        assertTrue(Duration.between(started, Instant.now()).compareTo(Duration.ofSeconds(5)) < 0);
    }

    @Test
    void namesTheTimeLimitInSeconds() {
        model.hold();

        assertEquals("the AI did not answer within 1 second", failure(client(KEY, Duration.ofSeconds(1))).getMessage());
    }

    @Test
    void failsWhenTheApiCannotBeReached() {
        ChatClient client = client();
        model.close();

        ApiException e = failure(client);

        assertEquals(502, e.status());
        assertEquals("the AI service cannot be reached", e.getMessage());
    }

    @Test
    void saysWhyTheApiRefusedWithoutItsOwnWordsOrTheKey() {
        Map<Integer, String> messages = Map.of(
                401, "the AI service refused the key (AI_API_KEY)",
                403, "the AI service refused the key (AI_API_KEY)",
                404, "the AI service does not know the model or the address (AI_MODEL, AI_BASE_URL)",
                429, "the AI service is over its own limit: try again later",
                400, "the AI service answered HTTP 400",
                500, "the AI service answered HTTP 500");
        for (Map.Entry<Integer, String> refusal : messages.entrySet()) {
            model.respond(refusal.getKey(), "{\"error\":{\"message\":\"Bad key sk-123 for\\nwriter-1\"}}");

            ApiException e = failure(client());

            assertEquals(502, e.status(), "for " + refusal.getKey());
            assertEquals(refusal.getValue(), e.getMessage());
        }
    }

    @Test
    void failsOnARefusalWithoutAReasonOrWithOneThatIsNotJson() {
        for (String body : List.of("", "<html>Bad gateway</html>", "{\"error\":\"down\"}")) {
            model.respond(503, body);

            assertEquals("the AI service answered HTTP 503", failure(client()).getMessage(), body);
        }
    }

    @Test
    void failsOnAnAnswerThatWasCutOffOrDeclined() {
        model.answer(FakeModel.text(3).substring(0, 40), "length");
        ApiException cutOff = failure(client());
        assertEquals(502, cutOff.status());
        assertEquals("the answer of the AI was cut off before its end", cutOff.getMessage());

        model.answer("", "content_filter");
        ApiException declined = failure(client());
        assertEquals(502, declined.status());
        assertEquals("the AI declined to write the text", declined.getMessage());
    }

    @Test
    void failsOnAnAnswerThatIsNotAFinishedChatCompletion() {
        List<Runnable> answers = List.of(
                () -> model.respond(200, "not JSON"),
                () -> model.respond(200, "{}"),
                () -> model.respond(200, "{\"choices\":[]}"),
                () -> model.answer(FakeModel.text(3), "tool_calls"),
                () -> model.answer(null));
        for (Runnable answer : answers) {
            answer.run();

            ApiException e = failure(client());

            assertEquals(502, e.status());
            assertTrue(e.getMessage().startsWith("the AI gave an answer that cannot be used: "), e.getMessage());
        }
    }

    @Test
    void failsOnTextOfTheWrongShapeAndSaysWhatIsWrong() {
        model.answer("Here is the text you asked for.");
        assertEquals("the AI gave an answer that cannot be used: it is not JSON", failure(client()).getMessage());

        model.answer(FakeModel.text(2));
        ApiException e = failure(client());
        assertEquals(502, e.status());
        assertEquals("the AI gave an answer that cannot be used: it has 2 descriptions, and 3 were asked for",
                e.getMessage());
    }
}
