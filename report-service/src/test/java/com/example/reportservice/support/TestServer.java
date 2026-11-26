package com.example.reportservice.support;

import com.example.reportservice.json.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.function.Consumer;

/** A local HTTP server for tests, and a client to call it. */
public final class TestServer implements AutoCloseable {

    private final HttpServer server;
    private final HttpClient http = HttpClient.newHttpClient();

    /** Starts a server on a free port; {@code setup} registers what it serves. */
    public TestServer(Consumer<HttpServer> setup) throws IOException {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        setup.accept(server);
        server.start();
    }

    public HttpResponse<String> get(String path) throws IOException, InterruptedException {
        return send("GET", path);
    }

    public HttpResponse<String> send(String method, String path) throws IOException, InterruptedException {
        URI uri = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + path);
        HttpRequest request = HttpRequest.newBuilder(uri)
                .method(method, HttpRequest.BodyPublishers.noBody())
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public static JsonNode json(HttpResponse<String> response) throws IOException {
        return Json.read(response.body().getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void close() {
        server.stop(0);
    }
}
