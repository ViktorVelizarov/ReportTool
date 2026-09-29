package report;

import com.fasterxml.jackson.databind.JsonNode;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.BooleanSupplier;

/**
 * A fake Keycloak + OpenRemote manager for the master realm. Every API call is recorded as {@code "METHOD /path"}
 * (the path is relative to {@code /api/master}); the response is what {@link #respond} set, else 200 with no body.
 */
final class FakeManager implements AutoCloseable {

    static final String ASSETS = """
            [{"id":"a1","name":"Room","type":"RoomAsset","realm":"master","parentId":null,"path":["a1"],
              "createdOn":1000,"version":3,"accessPublicRead":false,"attributes":{"ignored":{}}},
             {"id":"a2","name":"Sensor","type":"ThingAsset","realm":"master","parentId":"a1","path":["a1","a2"],
              "createdOn":2000,"version":1,"accessPublicRead":true}]""";

    private static final String API = "/api/master";

    private final HttpServer server;
    private final AtomicInteger tokenCalls = new AtomicInteger();
    private final List<String> calls = new CopyOnWriteArrayList<>();
    private final List<String> authHeaders = new CopyOnWriteArrayList<>();
    private final Map<String, JsonNode> lastBodies = new ConcurrentHashMap<>();
    private final Map<String, String> responses = new ConcurrentHashMap<>();
    private final Map<String, Integer> failures = new ConcurrentHashMap<>();

    FakeManager() throws IOException {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/auth/realms/master/protocol/openid-connect/token", exchange ->
                reply(exchange, 200, "{\"access_token\":\"token" + tokenCalls.incrementAndGet() + "\",\"expires_in\":60}"));
        server.createContext(API, this::handleApi);
        server.start();
    }

    Config config() {
        String url = "http://127.0.0.1:" + server.getAddress().getPort();
        return Config.from(Map.of(
                "OR_CLIENT_ID", "id", "OR_CLIENT_SECRET", "secret", "OR_MANAGER", url, "OR_KEYCLOAK", url + "/auth")::get);
    }

    ManagerClient client() {
        return new ManagerClient(config());
    }

    /** Answers {@code call}, e.g. {@code "POST /asset/count"}, with this JSON body. */
    FakeManager respond(String call, String json) {
        responses.put(call, json);
        return this;
    }

    /** Answers the next {@code call} with this error status. */
    FakeManager failOnce(String call, int status) {
        failures.put(call, status);
        return this;
    }

    List<String> calls() {
        return calls;
    }

    List<String> authHeaders() {
        return authHeaders;
    }

    int tokenCalls() {
        return tokenCalls.get();
    }

    /** The JSON body of the most recent {@code call}. */
    JsonNode lastBody(String call) {
        return lastBodies.get(call);
    }

    /** Polls until the condition holds; fails after 5 seconds. */
    static void await(BooleanSupplier condition) throws InterruptedException {
        for (int i = 0; i < 250 && !condition.getAsBoolean(); i++) {
            Thread.sleep(20);
        }
        if (!condition.getAsBoolean()) {
            throw new AssertionError("condition not met within 5s");
        }
    }

    @Override
    public void close() {
        server.stop(0);
    }

    private void handleApi(HttpExchange exchange) throws IOException {
        String call = exchange.getRequestMethod() + " " + exchange.getRequestURI().getPath().substring(API.length());
        byte[] body = exchange.getRequestBody().readAllBytes();
        if (body.length > 0) {
            lastBodies.put(call, ManagerClient.MAPPER.readTree(body));
        }
        authHeaders.add(exchange.getRequestHeaders().getFirst("Authorization"));
        calls.add(call);

        Integer failure = failures.remove(call);
        if (failure != null) {
            reply(exchange, failure, "{\"error\":\"failed\"}");
        } else {
            reply(exchange, 200, responses.getOrDefault(call, ""));
        }
    }

    private static void reply(HttpExchange exchange, int status, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length == 0 ? -1 : bytes.length);
        if (bytes.length > 0) {
            exchange.getResponseBody().write(bytes);
        }
        exchange.close();
    }
}
