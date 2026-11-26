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
 * (the path is relative to {@code /api/master}, without the query); the response is what {@link #respond} set, else
 * 200 with no body.
 */
final class FakeManager implements AutoCloseable {

    static final String ASSET_ID = "7A6p4AnLTkKxJUCQAAABAA";
    static final String OTHER_ASSET_ID = "6aH4yP9qom0LMlpa27Bqr5";

    /** One asset with a temperature attribute that stores data points. */
    static final String ASSET = """
            {"id":"%s","name":"Room","type":"RoomAsset","realm":"master","parentId":null,"path":["%s"],
             "createdOn":1000,"version":3,"accessPublicRead":false,
             "attributes":{"temperature":{"name":"temperature","type":"number","value":21.5,"timestamp":1700000000000,
               "meta":{"units":["celsius"],"storeDataPoints":true}}},
             "somethingNew":true}""".formatted(ASSET_ID, ASSET_ID);

    /** Two assets, the second without attributes. */
    static final String ASSETS = """
            [%s,
             {"id":"%s","name":"Sensor","type":"ThingAsset","realm":"master","parentId":"%s","path":["%s","%s"],
              "createdOn":2000,"version":1,"accessPublicRead":true}]""".formatted(
                    ASSET, OTHER_ASSET_ID, ASSET_ID, ASSET_ID, OTHER_ASSET_ID);

    private static final String API = "/api/master";

    private final HttpServer server;
    private final AtomicInteger tokenCalls = new AtomicInteger();
    private final List<String> calls = new CopyOnWriteArrayList<>();
    private final List<String> authHeaders = new CopyOnWriteArrayList<>();
    private final Map<String, JsonNode> lastBodies = new ConcurrentHashMap<>();
    private final Map<String, String> lastQueries = new ConcurrentHashMap<>();
    private final Map<String, String> responses = new ConcurrentHashMap<>();
    private final Map<String, Integer> failures = new ConcurrentHashMap<>();

    FakeManager() throws IOException {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/auth/realms/master/protocol/openid-connect/token", exchange -> reply(
                exchange, 200, "{\"access_token\":\"token" + tokenCalls.incrementAndGet() + "\",\"expires_in\":60}"));
        server.createContext(API, this::handleApi);
        server.start();
    }

    ManagerClient client() {
        String url = "http://127.0.0.1:" + server.getAddress().getPort();
        return new ManagerClient(Config.from(Map.of(
                "OR_CLIENT_ID", "id",
                "OR_CLIENT_SECRET", "secret",
                "OR_MANAGER", url,
                "OR_KEYCLOAK", url + "/auth")::get));
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

    /** The raw query string of the most recent {@code call}. */
    String lastQuery(String call) {
        return lastQueries.get(call);
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
        if (exchange.getRequestURI().getRawQuery() != null) {
            lastQueries.put(call, exchange.getRequestURI().getRawQuery());
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
