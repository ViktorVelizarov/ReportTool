package report;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.net.Socket;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.cert.X509Certificate;
import java.time.Duration;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509ExtendedTrustManager;

/** Client for the OpenRemote manager's external service registry, authenticated as a Keycloak service user. */
final class RegistryClient {

    private static final Duration TIMEOUT = Duration.ofSeconds(10);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final Config config;
    private final HttpClient http;

    RegistryClient(Config config) {
        this.config = config;
        HttpClient.Builder builder = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .followRedirects(HttpClient.Redirect.NORMAL)
                .connectTimeout(TIMEOUT);
        if (config.insecureTls()) {
            System.out.println("WARNING: OR_INSECURE_TLS=true, TLS certificates are NOT verified");
            builder.sslContext(trustAllContext());
        }
        this.http = builder.build();
    }

    /** Registers the service and returns the manager's description of it, including the {@code instanceId}. */
    JsonNode register(ObjectNode service) throws IOException, InterruptedException {
        return api("POST", "/service", service);
    }

    void heartbeat(String serviceId, String instanceId) throws IOException, InterruptedException {
        api("PUT", "/service/" + serviceId + "/" + instanceId, null);
    }

    void deregister(String serviceId, String instanceId) throws IOException, InterruptedException {
        api("DELETE", "/service/" + serviceId + "/" + instanceId, null);
    }

    private JsonNode api(String method, String path, ObjectNode body) throws IOException, InterruptedException {
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(config.managerUrl() + "/api/" + config.realm() + path))
                .header("Authorization", "Bearer " + fetchToken());
        if (body != null) {
            request.header("Content-Type", "application/json")
                    .method(method, HttpRequest.BodyPublishers.ofByteArray(MAPPER.writeValueAsBytes(body)));
        } else {
            request.method(method, HttpRequest.BodyPublishers.noBody());
        }
        return send(request);
    }

    private String fetchToken() throws IOException, InterruptedException {
        String form = "grant_type=client_credentials"
                + "&client_id=" + URLEncoder.encode(config.clientId(), StandardCharsets.UTF_8)
                + "&client_secret=" + URLEncoder.encode(config.clientSecret(), StandardCharsets.UTF_8);
        String url = config.keycloakUrl() + "/realms/" + config.realm() + "/protocol/openid-connect/token";
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(url))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(form));
        return send(request).get("access_token").asText();
    }

    /** Sends the request; returns the parsed JSON body, or null for an empty one. */
    private JsonNode send(HttpRequest.Builder request) throws IOException, InterruptedException {
        HttpResponse<byte[]> response = http.send(request.timeout(TIMEOUT).build(), HttpResponse.BodyHandlers.ofByteArray());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new HttpStatusException(response.statusCode(), response.body());
        }
        return response.body().length > 0 ? MAPPER.readTree(response.body()) : null;
    }

    /** Local testing only, e.g. the docker proxy's self-signed certificate. */
    private static SSLContext trustAllContext() {
        TrustManager trustAll = new X509ExtendedTrustManager() {
            @Override public void checkClientTrusted(X509Certificate[] chain, String authType) { }
            @Override public void checkServerTrusted(X509Certificate[] chain, String authType) { }
            @Override public void checkClientTrusted(X509Certificate[] chain, String authType, Socket socket) { }
            @Override public void checkServerTrusted(X509Certificate[] chain, String authType, Socket socket) { }
            @Override public void checkClientTrusted(X509Certificate[] chain, String authType, SSLEngine engine) { }
            @Override public void checkServerTrusted(X509Certificate[] chain, String authType, SSLEngine engine) { }
            @Override public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
        };
        try {
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(null, new TrustManager[] {trustAll}, null);
            return context;
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException(e);
        }
    }

    /** A non-2xx response. */
    @SuppressWarnings("serial")
    static final class HttpStatusException extends IOException {
        final int status;

        HttpStatusException(int status, byte[] body) {
            super("HTTP " + status + " '" + preview(body) + "'");
            this.status = status;
        }

        private static String preview(byte[] body) {
            String text = new String(body, StandardCharsets.UTF_8);
            return text.length() > 200 ? text.substring(0, 200) : text;
        }
    }
}
