package com.example.reportservice.ai;

import com.example.reportservice.config.AiSettings;
import com.example.reportservice.json.Json;
import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Has the model write the text of a report, with one call to the chat completions of an API that is compatible with
 * OpenAI's: {@code POST {baseUrl}/chat/completions}.
 *
 * <p>The request has the model, the two messages and the shape that the answer must have, as a strict JSON schema, and
 * nothing else: no sampling settings, no token limit and no streaming. That is the smallest request that hosted and
 * local APIs alike accept. Every failure is an {@link ApiException} with a message of its own for the author: 504 when
 * the model does not answer in time, and 502 when the API cannot be reached, refuses, or gives an answer that cannot
 * be used.
 *
 * <p>The log gets the model, how long the call took and how many tokens it used, or why it failed, which for a request
 * that the API refuses is what the API says about it, cut short. It never gets the prompt, the text or the key.
 */
final class ChatClient {

    private static final Logger LOG = LoggerFactory.getLogger(ChatClient.class);
    private static final int MAX_LOGGED_REASON = 200;

    private final AiSettings settings;
    private final URI endpoint;
    private final HttpClient http;

    ChatClient(AiSettings settings) {
        this.settings = settings;
        this.endpoint = URI.create(settings.baseUrl() + "/chat/completions");
        // HTTP/1.1, as for the manager: over plain http the client would otherwise ask to upgrade to HTTP/2, which a
        // local server may not understand. Redirects are not followed, so the key goes to this address only.
        this.http = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build();
    }

    /**
     * The text that the model writes.
     *
     * @param system       the rules for the model
     * @param user         the report and its figures, and what to write
     * @param descriptions how many widget descriptions the answer must have
     * @throws ApiException if the model gives no text that can be used, or not in time
     */
    TextAnswer write(String system, String user, int descriptions) throws InterruptedException {
        Instant started = Instant.now();
        try {
            JsonNode completion = complete(system, user);
            TextAnswer answer = answerOf(completion, descriptions);
            JsonNode usage = completion.path("usage");
            LOG.info("AI text by {} in {} ms, {} tokens in and {} out", settings.model(), millisSince(started),
                    usage.path("prompt_tokens").asText("unknown"), usage.path("completion_tokens").asText("unknown"));
            return answer;
        } catch (ApiException e) {
            LOG.warn("AI text by {} failed after {} ms with {}: {}", settings.model(), millisSince(started),
                    e.status(), e.getMessage());
            throw e;
        }
    }

    /** The answer of the API to the request, which is a chat completion when the API accepts the request. */
    private JsonNode complete(String system, String user) throws InterruptedException {
        HttpRequest.Builder request = HttpRequest.newBuilder(endpoint)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody(system, user).toString()));
        if (settings.apiKey() != null) {
            request.header("Authorization", "Bearer " + settings.apiKey());
        }
        HttpResponse<byte[]> response = send(request.build());
        if (response.statusCode() / 100 != 2) {
            LOG.warn("The AI service answered {}: {}", response.statusCode(), reasonOf(response.body()));
            throw new ApiException(502, refusal(response.statusCode()));
        }
        try {
            return Json.read(response.body());
        } catch (IOException e) {
            throw unusable("it is not JSON");
        }
    }

    /**
     * Sends the request and waits for the whole answer, for as long as the settings allow. The limit is on the call as
     * a whole: a limit on the request alone can stop counting when the first part of the answer is there.
     */
    private HttpResponse<byte[]> send(HttpRequest request) throws InterruptedException {
        CompletableFuture<HttpResponse<byte[]>> call = http.sendAsync(request, HttpResponse.BodyHandlers.ofByteArray());
        try {
            return call.get(settings.timeout().toMillis(), TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            call.cancel(true);
            throw new ApiException(504, "the AI did not answer within " + seconds(settings.timeout()));
        } catch (ExecutionException e) {
            LOG.warn("The AI service cannot be reached at {}: {}", settings.host(), e.getCause().toString());
            throw new ApiException(502, "the AI service cannot be reached");
        } catch (InterruptedException e) {
            call.cancel(true);
            throw e;
        }
    }

    private ObjectNode requestBody(String system, String user) {
        ObjectNode body = Json.object().put("model", settings.model());
        body.putArray("messages")
                .add(Json.object().put("role", "system").put("content", system))
                .add(Json.object().put("role", "user").put("content", user));
        ObjectNode schema = Json.object().put("type", "object").put("additionalProperties", false);
        schema.putArray("required").add("introduction").add("findings").add("descriptions").add("conclusion");
        ObjectNode properties = schema.putObject("properties");
        properties.putObject("introduction").put("type", "string");
        properties.putObject("findings").put("type", "string");
        properties.putObject("descriptions").put("type", "array").putObject("items").put("type", "string");
        properties.putObject("conclusion").put("type", "string");
        ObjectNode format = body.putObject("response_format").put("type", "json_schema");
        format.putObject("json_schema").put("name", "report_text").put("strict", true).set("schema", schema);
        return body;
    }

    /** The text in a chat completion, which must be finished and of the shape that was asked for. */
    private static TextAnswer answerOf(JsonNode completion, int descriptions) {
        JsonNode choice = completion.path("choices").path(0);
        String finish = choice.path("finish_reason").asText("");
        if (finish.equals("length")) {
            throw new ApiException(502, "the answer of the AI was cut off before its end");
        }
        if (finish.equals("content_filter")) {
            throw new ApiException(502, "the AI declined to write the text");
        }
        JsonNode content = choice.path("message").path("content");
        if (!finish.equals("stop") || !content.isTextual()) {
            throw unusable("it has no finished text");
        }
        try {
            return TextAnswer.parse(content.asText(), descriptions);
        } catch (IllegalArgumentException e) {
            throw unusable(e.getMessage());
        }
    }

    private static ApiException unusable(String why) {
        return new ApiException(502, "the AI gave an answer that cannot be used: " + why);
    }

    /** What the author is told when the API refuses the request. What the API says itself is for the log. */
    private static String refusal(int status) {
        return switch (status) {
            case 401, 403 -> "the AI service refused the key (AI_API_KEY)";
            case 404 -> "the AI service does not know the model or the address (AI_MODEL, AI_BASE_URL)";
            case 429 -> "the AI service is over its own limit: try again later";
            default -> "the AI service answered HTTP " + status;
        };
    }

    /** The message of an error answer, as OpenAI's format has it, on one line and cut short. */
    private static String reasonOf(byte[] body) {
        String reason;
        try {
            reason = Json.read(body).path("error").path("message").asText("");
        } catch (IOException e) {
            reason = "";
        }
        reason = reason.replaceAll("\\s+", " ").strip();
        if (reason.isEmpty()) {
            return "no reason given";
        }
        return reason.length() > MAX_LOGGED_REASON ? reason.substring(0, MAX_LOGGED_REASON) + "..." : reason;
    }

    private static String seconds(Duration timeout) {
        return timeout.toSeconds() == 1 ? "1 second" : timeout.toSeconds() + " seconds";
    }

    private static long millisSince(Instant started) {
        return Duration.between(started, Instant.now()).toMillis();
    }
}
