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

    /** The address of the server, without a path. */
    public String url() {
        return "http://127.0.0.1:" + server.getAddress().getPort();
    }

    public HttpResponse<String> get(String path) throws IOException, InterruptedException {
        return send("GET", path);
    }

    public HttpResponse<String> send(String method, String path) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(url() + path))
                .method(method, HttpRequest.BodyPublishers.noBody())
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> post(String path, String body) throws IOException, InterruptedException {
        return http.send(postRequest(path, body), HttpResponse.BodyHandlers.ofString());
    }

    /** Like {@link #post}, for an answer that is a file and not text. */
    public HttpResponse<byte[]> postForBytes(String path, String body) throws IOException, InterruptedException {
        return http.send(postRequest(path, body), HttpResponse.BodyHandlers.ofByteArray());
    }

    private HttpRequest postRequest(String path, String body) {
        return HttpRequest.newBuilder(URI.create(url() + path))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
    }

    public static JsonNode json(HttpResponse<String> response) throws IOException {
        return Json.read(response.body().getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void close() {
        server.stop(0);
    }
}
