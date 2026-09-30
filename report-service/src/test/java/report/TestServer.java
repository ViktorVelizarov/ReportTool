package report;

import com.fasterxml.jackson.databind.JsonNode;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.function.Consumer;

/** A local HTTP server for tests, and a client to call it. */
final class TestServer implements AutoCloseable {

    private final HttpServer server;
    private final HttpClient http = HttpClient.newHttpClient();

    /** Starts a server on a free port; {@code setup} registers what it serves. */
    TestServer(Consumer<HttpServer> setup) throws IOException {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        setup.accept(server);
        server.start();
    }

    HttpResponse<String> get(String path) throws IOException, InterruptedException {
        return send("GET", path);
    }

    HttpResponse<String> send(String method, String path) throws IOException, InterruptedException {
        URI uri = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + path);
        HttpRequest request = HttpRequest.newBuilder(uri)
                .method(method, HttpRequest.BodyPublishers.noBody())
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }

    static JsonNode json(HttpResponse<String> response) throws IOException {
        return ManagerClient.MAPPER.readTree(response.body());
    }

    @Override
    public void close() {
        server.stop(0);
    }
}
