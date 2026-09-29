package report;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Read-only JSON endpoints that expose live OpenRemote data through this service. */
final class ApiEndpoints {

    private final AssetClient assets;

    ApiEndpoints(AssetClient assets) {
        this.assets = assets;
    }

    void register(HttpServer server) {
        route(server, "/assets", this::listAssets);
    }

    /** {@code GET /assets?type=&limit=&offset=} : asset identities, without attributes. */
    private Object listAssets(Map<String, String> params) throws IOException, InterruptedException {
        String type = params.get("type");
        int limit = intParam(params, "limit");
        int offset = intParam(params, "offset");
        return new AssetList(assets.count(type), assets.list(type, limit, offset));
    }

    /** @param total number of assets matching the filter, ignoring limit and offset */
    private record AssetList(int total, List<Asset> assets) { }

    @FunctionalInterface
    private interface Route {
        Object handle(Map<String, String> params) throws IOException, InterruptedException;
    }

    private static void route(HttpServer server, String path, Route route) {
        server.createContext(path, exchange -> {
            try (exchange) {
                if (!exchange.getRequestURI().getPath().equals(path)) {
                    respond(exchange, 404, Map.of("error", "not found"));
                } else if (!"GET".equals(exchange.getRequestMethod())) {
                    exchange.getResponseHeaders().set("Allow", "GET");
                    respond(exchange, 405, Map.of("error", "method not allowed"));
                } else {
                    try {
                        respond(exchange, 200, route.handle(params(exchange)));
                    } catch (IllegalArgumentException e) {
                        respond(exchange, 400, Map.of("error", e.getMessage()));
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        respond(exchange, 503, Map.of("error", "interrupted"));
                    } catch (IOException e) {
                        System.out.println("GET " + path + " failed: " + e);
                        respond(exchange, 502, Map.of("error", "OpenRemote request failed: " + e.getMessage()));
                    }
                }
            }
        });
    }

    private static void respond(HttpExchange exchange, int status, Object body) throws IOException {
        byte[] json = ManagerClient.MAPPER.writeValueAsBytes(body);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(status, json.length);
        exchange.getResponseBody().write(json);
    }

    private static Map<String, String> params(HttpExchange exchange) {
        Map<String, String> params = new LinkedHashMap<>();
        String query = exchange.getRequestURI().getRawQuery();
        if (query != null) {
            for (String pair : query.split("&")) {
                int eq = pair.indexOf('=');
                String name = eq < 0 ? pair : pair.substring(0, eq);
                String value = eq < 0 ? "" : pair.substring(eq + 1);
                params.put(URLDecoder.decode(name, StandardCharsets.UTF_8), URLDecoder.decode(value, StandardCharsets.UTF_8));
            }
        }
        return params;
    }

    /** A non-negative integer parameter, 0 when absent. */
    private static int intParam(Map<String, String> params, String name) {
        String value = params.get(name);
        if (value == null || value.isEmpty()) return 0;
        try {
            int parsed = Integer.parseInt(value);
            if (parsed < 0) throw new IllegalArgumentException(name + " must not be negative");
            return parsed;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(name + " must be an integer");
        }
    }
}
