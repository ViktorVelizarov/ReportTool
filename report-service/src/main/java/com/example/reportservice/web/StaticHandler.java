package com.example.reportservice.web;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Serves the web interface, which the manager shows in an iframe. The files are read from the {@code static} folder of
 * the classpath, where the build puts the {@code frontend} folder. {@code /} serves {@code index.html}, and so does
 * {@code /{realm}}, a single path segment without a dot: the address that the manager opens for a global service.
 *
 * <p>Otherwise only files with a known extension are served, and every path segment must be a plain file name, so a
 * request cannot reach other resources of the classpath or list a folder.
 */
public final class StaticHandler implements HttpHandler {

    private static final String ROOT = "/static";
    private static final String INDEX = "/index.html";
    private static final Pattern SEGMENT = Pattern.compile("[A-Za-z0-9_-][A-Za-z0-9._-]*");
    private static final Map<String, String> CONTENT_TYPES = Map.of(
            "html", "text/html; charset=utf-8",
            "css", "text/css; charset=utf-8",
            "js", "text/javascript; charset=utf-8");

    private record Target(String resource, String contentType) { }

    private static final Target PAGE = new Target(ROOT + INDEX, CONTENT_TYPES.get("html"));

    /** @throws IOException if the interface is missing from the classpath */
    public StaticHandler() throws IOException {
        if (read(ROOT + INDEX) == null) {
            throw new IOException(
                    ROOT + INDEX + " is missing from the classpath: the build copies ../frontend into it");
        }
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        try (exchange) {
            if (!"GET".equals(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().set("Allow", "GET");
                Router.sendJson(exchange, 405, Map.of("error", "method not allowed"));
                return;
            }
            Target target = find(exchange.getRequestURI().getPath());
            byte[] body = target == null ? null : read(target.resource());
            if (body == null) {
                Router.sendJson(exchange, 404, Map.of("error", "not found"));
                return;
            }
            Headers headers = exchange.getResponseHeaders();
            headers.set("Content-Type", target.contentType());
            headers.set("Cache-Control", "no-cache");
            headers.set("X-Content-Type-Options", "nosniff");
            // no X-Frame-Options: the manager embeds this page in an iframe
            exchange.sendResponseHeaders(200, body.length);
            exchange.getResponseBody().write(body);
        }
    }

    /** The classpath resource for a (decoded) request path, or null if the path is not a file of the interface. */
    private static Target find(String requestPath) {
        if ("/".equals(requestPath)) {
            return PAGE;
        }
        if (!requestPath.startsWith("/")) {
            return null;
        }
        String[] segments = requestPath.substring(1).split("/", -1);
        for (String segment : segments) {
            if (!SEGMENT.matcher(segment).matches()) {
                return null;
            }
        }
        String name = segments[segments.length - 1];
        int dot = name.lastIndexOf('.');
        if (dot < 0) {
            return segments.length == 1 ? PAGE : null;
        }
        String contentType = CONTENT_TYPES.get(name.substring(dot + 1));
        return contentType == null ? null : new Target(ROOT + requestPath, contentType);
    }

    private static byte[] read(String resource) throws IOException {
        try (InputStream in = StaticHandler.class.getResourceAsStream(resource)) {
            return in == null ? null : in.readAllBytes();
        }
    }
}
