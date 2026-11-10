package com.example.reportservice.web;

import com.example.reportservice.json.Json;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Serves JSON endpoints on an {@link HttpServer}: GET routes that read, and POST and PUT routes that take a JSON body.
 *
 * <p>A {@link Handler} returns the response body, which is written as JSON (or as it is, when it is a {@link Binary}),
 * or throws to report an error: {@link ApiException} sets the status itself, an {@link IOException} (a failed or
 * refused call to the manager) becomes a 502, an interruption a 503 and any other unexpected failure a 500, each with a
 * JSON {@code {"error": ...}} body.
 *
 * <p>The router handles every request of the server. A path that is not a route goes to the fallback handler, which
 * by default answers 404, so that something else (the web interface) can serve all other paths. A path that is a route
 * for another method only is answered with 405.
 */
public final class Router {

    @FunctionalInterface
    public interface Handler {
        Object handle(Request request) throws IOException, InterruptedException;
    }

    /** The largest body that a request may have; a report with all its widgets is far below it. */
    static final int MAX_BODY_BYTES = 2 * 1024 * 1024;

    private static final Logger LOG = LoggerFactory.getLogger(Router.class);

    private record Route(String method, List<String> pattern, Handler handler) { }

    private final List<Route> routes = new ArrayList<>();
    private final HttpHandler fallback;

    /** A router that answers a path that is not a route with 404. */
    public Router() {
        this(exchange -> {
            try (exchange) {
                sendJson(exchange, 404, error("not found"));
            }
        });
    }

    /** A router that leaves a path that is not a route to {@code fallback}, which must complete the exchange. */
    public Router(HttpHandler fallback) {
        this.fallback = fallback;
    }

    /** Adds a GET route. Segments in braces capture path parameters, e.g. {@code /assets/{id}}. */
    public void get(String pattern, Handler handler) {
        routes.add(new Route("GET", segments(pattern), handler));
    }

    /** Adds a POST route, which reads the body of the request with {@link Request#jsonBody()}. */
    public void post(String pattern, Handler handler) {
        routes.add(new Route("POST", segments(pattern), handler));
    }

    /** Adds a PUT route, which reads the body of the request with {@link Request#jsonBody()}. */
    public void put(String pattern, Handler handler) {
        routes.add(new Route("PUT", segments(pattern), handler));
    }

    /**
     * Serves the routes on the server, and everything else through the fallback. A route is matched on whole path
     * segments, so {@code /assets} does not take {@code /assets-demo}, which a context of the server would.
     */
    public void register(HttpServer server) {
        server.createContext("/", this::handle);
    }

    private void handle(HttpExchange exchange) throws IOException {
        List<String> path = segments(exchange.getRequestURI().getPath());
        Set<String> otherMethods = new TreeSet<>();
        for (Route route : routes) {
            Map<String, String> pathParams = match(route.pattern(), path);
            if (pathParams == null) {
                continue;
            }
            if (route.method().equals(exchange.getRequestMethod())) {
                serve(exchange, route, pathParams);
                return;
            }
            otherMethods.add(route.method());
        }
        if (!otherMethods.isEmpty()) {
            try (exchange) {
                exchange.getResponseHeaders().set("Allow", String.join(", ", otherMethods));
                sendJson(exchange, 405, error("method not allowed"));
            }
            return;
        }
        fallback.handle(exchange);
    }

    private void serve(HttpExchange exchange, Route route, Map<String, String> pathParams) throws IOException {
        // the raw path: a decoded one could contain line breaks
        String description = exchange.getRequestMethod() + " " + exchange.getRequestURI().getRawPath();
        int status = 200;
        Object body;
        try {
            body = route.handler().handle(new Request(pathParams, queryParams(exchange), readBody(exchange)));
        } catch (ApiException e) {
            status = e.status();
            body = error(e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            status = 503;
            body = error("interrupted");
        } catch (IOException e) {
            status = 502;
            body = error("OpenRemote request failed: " + summary(e));
            LOG.warn("{} failed: {}", description, describe(e));
        } catch (RuntimeException e) {
            status = 500;
            body = error("internal error");
            LOG.error("{} failed", description, e);
        }

        try (exchange) {
            if (body instanceof Binary binary) {
                send(exchange, status, binary.contentType(), binary.bytes());
            } else {
                sendJson(exchange, status, body);
            }
        }
    }

    /** Writes the body as JSON. The caller closes the exchange. */
    static void sendJson(HttpExchange exchange, int status, Object body) throws IOException {
        send(exchange, status, "application/json; charset=utf-8", Json.write(body));
    }

    private static void send(HttpExchange exchange, int status, String contentType, byte[] body) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(status, body.length);
        exchange.getResponseBody().write(body);
    }

    /** The body of the request; one that is larger than {@link #MAX_BODY_BYTES} is rejected with 413. */
    private static byte[] readBody(HttpExchange exchange) throws IOException {
        byte[] body = exchange.getRequestBody().readNBytes(MAX_BODY_BYTES + 1);
        if (body.length > MAX_BODY_BYTES) {
            throw new ApiException(413, "the request is too large");
        }
        return body;
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
