package com.example.reportservice.openremote;

import com.example.reportservice.config.Config;
import com.example.reportservice.json.Json;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
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
import java.time.Instant;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509ExtendedTrustManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Authenticated JSON client for the OpenRemote manager REST API ({@code /api/{realm}/...}).
 *
 * <p>Authenticates as a Keycloak service user (client credentials) and caches the access token until shortly
 * before it expires.
 */
public final class ManagerClient {

    private static final Logger LOG = LoggerFactory.getLogger(ManagerClient.class);
    private static final Duration TIMEOUT = Duration.ofSeconds(10);
    private static final long TOKEN_REFRESH_MARGIN_SECONDS = 10;

    private final Config config;
    private final HttpClient http;
    private String token;
    private Instant tokenExpiry = Instant.MIN;

    public ManagerClient(Config config) {
        this.config = config;
        HttpClient.Builder builder = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .followRedirects(HttpClient.Redirect.NORMAL)
                .connectTimeout(TIMEOUT);
        if (config.insecureTls()) {
            LOG.warn("OR_INSECURE_TLS=true: TLS certificates are NOT verified");
            builder.sslContext(trustAllContext());
        }
        this.http = builder.build();
    }

    /** The realm of the service user: the one it logs in to, and the default realm of the service's endpoints. */
    public String realm() {
        return config.realm();
    }

    /**
     * Calls {@code /api/{realm}{path}} in the realm of the service user; a non-null body is sent as JSON. Returns the
     * parsed JSON response, or null if it was empty.
     *
     * <p>The manager checks a token against the realm in the path, so a token is only good for the API of its own
     * realm, also when the user is a super user (a user of the master realm with the {@code admin} realm role). A super
     * user reads another realm by naming it in the request, as the manager's own UI does: in an asset query.
     *
     * @throws HttpStatusException on a non-2xx response
     */
    public JsonNode request(String method, String path, JsonNode body) throws IOException, InterruptedException {
        String url = config.managerUrl() + "/api/" + config.realm() + path;
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(url))
                .header("Authorization", "Bearer " + token());
        if (body != null) {
            request.header("Content-Type", "application/json")
                    .method(method, HttpRequest.BodyPublishers.ofByteArray(Json.write(body)));
        } else {
            request.method(method, HttpRequest.BodyPublishers.noBody());
        }
        return send(request);
    }

    /**
     * Maps a manager response to a type. A response of the wrong shape is an {@link IOException}, like any other bad
     * answer from the manager.
     */
    public static <T> T convert(JsonNode response, TypeReference<T> type) throws IOException {
        if (response == null) {
            throw new IOException("Empty response from OpenRemote");
        }
        try {
            return Json.convert(response, type);
        } catch (IllegalArgumentException e) {
            throw new IOException("Unexpected response format from OpenRemote", e);
        }
    }

    private synchronized String token() throws IOException, InterruptedException {
        if (Instant.now().isBefore(tokenExpiry)) {
            return token;
        }
        String form = "grant_type=client_credentials"
                + "&client_id=" + URLEncoder.encode(config.clientId(), StandardCharsets.UTF_8)
                + "&client_secret=" + URLEncoder.encode(config.clientSecret(), StandardCharsets.UTF_8);
        String url = config.keycloakUrl() + "/realms/" + config.realm() + "/protocol/openid-connect/token";
        JsonNode response = send(HttpRequest.newBuilder(URI.create(url))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(form)));
        if (response == null || !response.hasNonNull("access_token")) {
            throw new IOException("Keycloak response contains no access_token");
        }
        token = response.get("access_token").asText();
        long lifetime = response.path("expires_in").asLong(0);
        tokenExpiry = Instant.now().plusSeconds(Math.max(0, lifetime - TOKEN_REFRESH_MARGIN_SECONDS));
        return token;
    }

    /** Sends the request; returns the parsed JSON body, or null for an empty one. */
    private JsonNode send(HttpRequest.Builder request) throws IOException, InterruptedException {
        HttpResponse<byte[]> response =
                http.send(request.timeout(TIMEOUT).build(), HttpResponse.BodyHandlers.ofByteArray());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new HttpStatusException(response.statusCode(), response.body());
        }
        return response.body().length > 0 ? Json.read(response.body()) : null;
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
}
