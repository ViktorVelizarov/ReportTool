package report;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.Executors;

/**
 * Minimal OpenRemote external service: serves a page and live OpenRemote data, and keeps a lease on the manager
 * registry. See README.md for the settings.
 */
public final class ReportService {

    private static final String SERVICE_ID = "report-service";
    private static final Duration HEARTBEAT = Duration.ofSeconds(20);
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

        ManagerClient manager = new ManagerClient(config);
        HttpServer server = startServer(config.port(), new ApiEndpoints(new AssetClient(manager)));
        ServiceRegistration registration = new ServiceRegistration(manager, describeService(config), HEARTBEAT);
        registration.start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            registration.stop();
            server.stop(0);
        }));
        System.out.println("listening on http://localhost:" + config.port() + "/");
    }

    private static ObjectNode describeService(Config config) {
        return ManagerClient.MAPPER.createObjectNode()
                .put("serviceId", SERVICE_ID)
                .put("label", "Reports")
                .put("icon", "file-chart")
                .put("version", "0.1.0")
                .put("homepageUrl", "http://localhost:" + config.port() + "/")
                .put("status", "AVAILABLE");
    }

    private static HttpServer startServer(int port, ApiEndpoints api) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", port), 0);
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
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
        api.register(server);
        server.start();
        return server;
    }
}
