package com.example.reportservice.support;

import com.example.reportservice.json.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;

/**
 * A fake model: an API that is compatible with OpenAI's chat completions, at {@link #baseUrl()}. It records every call
 * and answers what the test tells it to; until then it answers with {@link #text} for three widgets.
 */
public final class FakeModel implements AutoCloseable {

    private static final String PATH = "/v1/chat/completions";

    private final HttpServer server;
    private final List<JsonNode> requests = new CopyOnWriteArrayList<>();
    private final List<String> authHeaders = new CopyOnWriteArrayList<>();
    private final CountDownLatch released = new CountDownLatch(1);
    private volatile int status = 200;
    private volatile String body = completion(text(3), "stop");
    private volatile boolean held;
    private boolean closed;

    public FakeModel() throws IOException {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/", this::handle);
        // a thread for each call, so that calls that are held do not keep the others waiting
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
        server.start();
    }

    /** The address to set the service up with, as {@code AI_BASE_URL}. */
    public String baseUrl() {
        return "http://127.0.0.1:" + server.getAddress().getPort() + "/v1";
    }

    /** The answer of a model that wrote this many widget descriptions, as the JSON that the service asks for. */
    public static String text(int descriptions) {
        ObjectNode text = Json.object().put("introduction", "This report is about the rooms.");
        text.put("findings", "The rooms were 21.5 degrees on average.");
        ArrayNode list = text.putArray("descriptions");
        for (int i = 1; i <= descriptions; i++) {
            list.add("Widget " + i + " shows a room.");
        }
        return text.put("conclusion", "Nothing needs attention.").toString();
    }

    /** Answers with a finished chat completion that has this content. */
    public FakeModel answer(String content) {
        return answer(content, "stop");
    }

    /** Answers with a chat completion that has this content and ended for this reason. */
    public FakeModel answer(String content, String finishReason) {
        return respond(200, completion(content, finishReason));
    }

    /** Answers with this status and this body, whatever it is. */
    public FakeModel respond(int status, String body) {
        this.status = status;
        this.body = body;
        return this;
    }

    /** Keeps every call waiting from now on, until {@link #release()} or {@link #close()}. */
    public FakeModel hold() {
        held = true;
        return this;
    }

    /** Answers the calls that are held, and the ones that follow. */
    public void release() {
        released.countDown();
    }

    /** The bodies of the calls, oldest first. */
    public List<JsonNode> requests() {
        return requests;
    }

    /** The {@code Authorization} header of each call, oldest first; null for a call without one. */
    public List<String> authHeaders() {
        return authHeaders;
    }

    /** Stops the model, after which it cannot be reached. Closing it again does nothing. */
    @Override
    public void close() {
        if (!closed) {
            closed = true;
            release();
            server.stop(0);
        }
    }

    private void handle(HttpExchange exchange) throws IOException {
        try (exchange) {
            if (!exchange.getRequestMethod().equals("POST") || !exchange.getRequestURI().getPath().equals(PATH)) {
                reply(exchange, 404, "{\"error\":{\"message\":\"no such path\"}}");
                return;
            }
            authHeaders.add(exchange.getRequestHeaders().getFirst("Authorization"));
            requests.add(Json.read(exchange.getRequestBody().readAllBytes()));
            if (held) {
                released.await();
            }
            reply(exchange, status, body);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private static void reply(HttpExchange exchange, int status, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length == 0 ? -1 : bytes.length);
        exchange.getResponseBody().write(bytes);
    }

    private static String completion(String content, String finishReason) {
        ObjectNode completion = Json.object().put("id", "chatcmpl-1").put("object", "chat.completion");
        completion.putArray("choices").addObject()
                .put("index", 0)
                .put("finish_reason", finishReason)
                .putObject("message").put("role", "assistant").put("content", content);
        completion.putObject("usage").put("prompt_tokens", 1200).put("completion_tokens", 300);
        return completion.toString();
    }
}
