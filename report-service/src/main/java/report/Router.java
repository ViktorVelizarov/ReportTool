package report;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Serves read-only JSON GET endpoints on an {@link HttpServer}.
 *
 * <p>A {@link Handler} returns the response body, which is written as JSON, or throws to report an error:
 * {@link ApiException} sets the status itself, an {@link IOException} (a failed or refused call to the manager)
 * becomes a 502, an interruption a 503 and any other unexpected failure a 500, each with a JSON
 * {@code {"error": ...}} body.
 */
final class Router {

    @FunctionalInterface
    interface Handler {
        Object handle(Request request) throws IOException, InterruptedException;
    }

    private record Route(List<String> pattern, Handler handler) { }

    private final List<Route> routes = new ArrayList<>();

    /** Adds a GET route. Segments in braces capture path parameters, e.g. {@code /assets/{id}}. */
    void get(String pattern, Handler handler) {
        routes.add(new Route(segments(pattern), handler));
    }

    /** Serves the routes on the server, under the first path segment of each pattern. */
    void register(HttpServer server) {
        routes.stream()
                .map(route -> "/" + route.pattern().getFirst())
                .distinct()
                .forEach(prefix -> server.createContext(prefix, this::handle));
    }

    private void handle(HttpExchange exchange) throws IOException {
        String description = exchange.getRequestMethod() + " " + exchange.getRequestURI().getPath();
        int status = 200;
        Object body;
        try {
            body = dispatch(exchange);
        } catch (ApiException e) {
            status = e.status;
            body = error(e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            status = 503;
            body = error("interrupted");
        } catch (IOException e) {
            status = 502;
            body = error("OpenRemote request failed: " + summary(e));
            System.out.println(description + " failed: " + describe(e));
        } catch (RuntimeException e) {
            status = 500;
            body = error("internal error");
            System.out.println(description + " failed: " + describe(e));
        }

        try (exchange) {
            byte[] json = ManagerClient.MAPPER.writeValueAsBytes(body);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
            exchange.sendResponseHeaders(status, json.length);
            exchange.getResponseBody().write(json);
        }
    }

    private Object dispatch(HttpExchange exchange) throws IOException, InterruptedException {
        List<String> path = segments(exchange.getRequestURI().getPath());
        for (Route route : routes) {
            Map<String, String> pathParams = match(route.pattern(), path);
            if (pathParams != null) {
                if (!"GET".equals(exchange.getRequestMethod())) {
                    exchange.getResponseHeaders().set("Allow", "GET");
                    throw new ApiException(405, "method not allowed");
                }
                return route.handler().handle(new Request(pathParams, queryParams(exchange)));
            }
        }
        throw new ApiException(404, "not found");
    }

    /** The path parameters if the path fits the pattern, else null. */
    private static Map<String, String> match(List<String> pattern, List<String> path) {
        if (pattern.size() != path.size()) {
            return null;
        }
        Map<String, String> params = new HashMap<>();
        for (int i = 0; i < pattern.size(); i++) {
            String expected = pattern.get(i);
            if (expected.startsWith("{")) {
                if (path.get(i).isEmpty()) {
                    return null;
                }
                params.put(expected.substring(1, expected.length() - 1), path.get(i));
            } else if (!expected.equals(path.get(i))) {
                return null;
            }
        }
        return params;
    }

    /** Splits a decoded path; an encoded slash therefore separates segments and cannot end up inside a parameter. */
    private static List<String> segments(String path) {
        return path.startsWith("/") ? List.of(path.substring(1).split("/", -1)) : List.of();
    }

    private static Map<String, String> queryParams(HttpExchange exchange) {
        Map<String, String> params = new LinkedHashMap<>();
        String query = exchange.getRequestURI().getRawQuery();
        if (query != null) {
            for (String pair : query.split("&")) {
                int eq = pair.indexOf('=');
                String name = eq < 0 ? pair : pair.substring(0, eq);
                String value = eq < 0 ? "" : pair.substring(eq + 1);
                params.put(decode(name), decode(value));
            }
        }
        return params;
    }

    private static String decode(String encoded) {
        return URLDecoder.decode(encoded, StandardCharsets.UTF_8);
    }

    private static Map<String, String> error(String message) {
        return Map.of("error", message);
    }

    private static String summary(Throwable e) {
        return e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
    }

    /** The exception and its causes, for the log. */
    private static String describe(Throwable e) {
        StringBuilder description = new StringBuilder(e.toString());
        for (Throwable cause = e.getCause(); cause != null; cause = cause.getCause()) {
            description.append(" <- ").append(cause);
        }
        return description.toString();
    }
}
