package report;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Minimal OpenRemote external service: serves a page and keeps a lease on the manager registry.
 *
 * <p>See README.md for the settings. Use the Keycloak URL the manager advertises at /api/master/info: the manager
 * only accepts tokens whose issuer matches its authServerUrl.
 */
public final class ReportService {

    private static final String SERVICE_ID = "report-service";
    private static final int HEARTBEAT_SECONDS = 20; // the manager expires a lease after 60s without a heartbeat
    private static final DateTimeFormatter NOW_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private static final String PAGE = """
            <!doctype html><meta charset="utf-8"><title>Reports</title>
            <body style="font-family:sans-serif;padding:24px">
            <h2>Report service</h2>
            <p>Served by the external service on port %s, shown inside the OpenRemote manager.</p>
            <table border="1" cellpadding="6" style="border-collapse:collapse">
            <tr><th>Report</th><th>Generated</th></tr>
            <tr><td>Test report</td><td>%s</td></tr>
            </table></body>""";

    private ReportService() { }

    public static void main(String[] args) throws IOException {
        Config config;
        try {
            config = Config.load();
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            System.exit(1);
            return;
        }

        HttpServer server = startPageServer(config.port());
        CountDownLatch stop = new CountDownLatch(1);
        RegistryClient registry = new RegistryClient(config);
        Thread heartbeat = new Thread(() -> keepRegistered(registry, config, stop), "registry-heartbeat");
        heartbeat.start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            stop.countDown();
            try {
                heartbeat.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            server.stop(0);
        }));
        System.out.println("listening on http://localhost:" + config.port() + "/");
    }

    /** Registers, then heartbeats until {@code stop} is released; re-registers if the manager forgot us; deregisters on exit. */
    private static void keepRegistered(RegistryClient registry, Config config, CountDownLatch stop) {
        String instanceId = null;
        while (stop.getCount() > 0) {
            try {
                if (instanceId == null) {
                    instanceId = register(registry, config);
                } else {
                    registry.heartbeat(SERVICE_ID, instanceId);
                }
            } catch (RegistryClient.HttpStatusException e) {
                System.out.println("registry call failed: " + e.getMessage());
                if (e.status == 404) { // registry is in memory, so a manager restart forgets us
                    instanceId = null;
                }
            } catch (InterruptedException e) {
                break;
            } catch (Exception e) {
                System.out.println("registry call failed: " + e);
            }
            try {
                stop.await(HEARTBEAT_SECONDS, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                break;
            }
        }
        if (instanceId != null) {
            try {
                registry.deregister(SERVICE_ID, instanceId);
                System.out.println("deregistered");
            } catch (Exception e) {
                System.out.println("deregister failed: " + e);
            }
        }
    }

    private static String register(RegistryClient registry, Config config) throws IOException, InterruptedException {
        JsonNode service = registry.register(new ObjectMapper().createObjectNode()
                .put("serviceId", SERVICE_ID)
                .put("label", "Reports")
                .put("icon", "file-chart")
                .put("version", "0.1.0")
                .put("homepageUrl", "http://localhost:" + config.port() + "/")
                .put("status", "AVAILABLE"));
        String instanceId = service.get("instanceId").asText();
        System.out.println("registered " + SERVICE_ID + " instanceId=" + instanceId
                + " realm=" + service.get("realm").asText());
        return instanceId;
    }

    private static HttpServer startPageServer(int port) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", port), 0);
        server.setExecutor(Executors.newCachedThreadPool());
        server.createContext("/", exchange -> {
            try (exchange) {
                if (!"GET".equals(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(501, -1);
                    return;
                }
                byte[] body = PAGE.formatted(port, LocalDateTime.now().format(NOW_FORMAT))
                        .getBytes(StandardCharsets.UTF_8);
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=utf-8");
                // no X-Frame-Options: the manager embeds this page in an iframe
                exchange.sendResponseHeaders(200, body.length);
                exchange.getResponseBody().write(body);
            }
        });
        server.start();
        return server;
    }
}
