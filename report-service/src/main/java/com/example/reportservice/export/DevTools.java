package com.example.reportservice.export;

import com.example.reportservice.json.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;

/**
 * A connection to a browser with the Chrome DevTools protocol: JSON messages over a WebSocket. A command has an id and
 * the browser answers it with a message that has the same id; every other message is an event. One thread sends the
 * commands, and every wait ends at the deadline of the connection.
 */
final class DevTools implements AutoCloseable {

    /** The browser refused a command, which is a problem with the command and not with the connection. */
    @SuppressWarnings("serial")
    static final class CommandFailedException extends IOException {

        CommandFailedException(String message) {
            super(message);
        }
    }

    private static final HttpClient HTTP = HttpClient.newHttpClient();

    private final Map<Long, CompletableFuture<JsonNode>> pending = new ConcurrentHashMap<>();
    private final AtomicLong lastId = new AtomicLong();
    private final Instant deadline;
    private final WebSocket socket;
    private volatile Consumer<JsonNode> eventListener = event -> { };

    private DevTools(URI endpoint, Instant deadline) throws IOException, InterruptedException {
        this.deadline = deadline;
        try {
            socket = HTTP.newWebSocketBuilder().buildAsync(endpoint, new Receiver())
                    .get(remaining().toMillis(), TimeUnit.MILLISECONDS);
        } catch (ExecutionException | TimeoutException e) {
            throw new IOException("Could not connect to the browser", e);
        }
    }

    /** Connects to the browser at the WebSocket address that it listens on. */
    static DevTools connect(URI endpoint, Instant deadline) throws IOException, InterruptedException {
        return new DevTools(endpoint, deadline);
    }

    /** The time left until the deadline, never negative. */
    private Duration remaining() {
        Duration left = Duration.between(Instant.now(), deadline);
        return left.isNegative() ? Duration.ZERO : left;
    }

    /** Hands the events of the browser (messages without an id) to the listener, on the thread of the connection. */
    void onEvent(Consumer<JsonNode> listener) {
        eventListener = listener;
    }

    /** Sends a command to the browser itself and returns the result that it answers with. */
    JsonNode call(String method, ObjectNode params) throws IOException, InterruptedException {
        return call(null, method, params);
    }

    /** Sends a command to the page of the session, or to the browser when sessionId is null. */
    JsonNode call(String sessionId, String method, ObjectNode params) throws IOException, InterruptedException {
        long id = lastId.incrementAndGet();
        ObjectNode command = Json.object().put("id", id).put("method", method);
        if (sessionId != null) {
            command.put("sessionId", sessionId);
        }
        command.set("params", params == null ? Json.object() : params);
        CompletableFuture<JsonNode> answer = new CompletableFuture<>();
        pending.put(id, answer);
        try {
            socket.sendText(new String(Json.write(command), StandardCharsets.UTF_8), true)
                    .get(remaining().toMillis(), TimeUnit.MILLISECONDS);
            return answer.get(remaining().toMillis(), TimeUnit.MILLISECONDS);
        } catch (ExecutionException e) {
            throw e.getCause() instanceof IOException io ? io : new IOException(method + " failed", e.getCause());
        } catch (TimeoutException e) {
            throw new IOException("The browser did not answer " + method + " in time");
        } finally {
            pending.remove(id);
        }
    }

    /** Tells the browser to quit. It does not wait for an answer: the browser is gone before it can give one. */
    void quitBrowser() throws InterruptedException {
        try {
            String command = "{\"id\":" + lastId.incrementAndGet() + ",\"method\":\"Browser.close\"}";
            socket.sendText(command, true).get(2, TimeUnit.SECONDS);
        } catch (ExecutionException | TimeoutException e) {
            // the browser is already on its way out
        }
    }

    @Override
    public void close() {
        socket.abort();
    }

    private void receive(String text) {
        JsonNode message;
        try {
            message = Json.read(text.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            fail(e);
            return;
        }
        JsonNode id = message.get("id");
        if (id == null) {
            eventListener.accept(message);
            return;
        }
        CompletableFuture<JsonNode> answer = pending.get(id.asLong());
        if (answer == null) {
            return;
        }
        JsonNode error = message.get("error");
        if (error != null) {
            answer.completeExceptionally(new CommandFailedException(error.path("message").asText("unknown error")));
        } else {
            answer.complete(message.path("result"));
        }
    }

    private void fail(Throwable cause) {
        IOException failure = cause instanceof IOException io ? io : new IOException(cause);
        pending.values().forEach(answer -> answer.completeExceptionally(failure));
    }

    /** Puts the pieces of a message together, and passes every whole message on. */
    private final class Receiver implements WebSocket.Listener {

        private final StringBuilder message = new StringBuilder();

        @Override
        public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
            message.append(data);
            if (last) {
                String text = message.toString();
                message.setLength(0);
                receive(text);
            }
            webSocket.request(1);
            return null;
        }

        @Override
        public CompletionStage<?> onClose(WebSocket webSocket, int statusCode, String reason) {
            fail(new IOException("The browser closed the connection"));
            return null;
        }

        @Override
        public void onError(WebSocket webSocket, Throwable error) {
            fail(error);
        }
    }
}
