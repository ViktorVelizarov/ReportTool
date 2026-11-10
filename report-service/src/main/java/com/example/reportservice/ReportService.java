package com.example.reportservice;

import com.example.reportservice.asset.AssetEndpoints;
import com.example.reportservice.branding.BrandingEndpoints;
import com.example.reportservice.config.Config;
import com.example.reportservice.datapoint.DatapointEndpoints;
import com.example.reportservice.export.BrowserLocator;
import com.example.reportservice.export.ChromiumPdfRenderer;
import com.example.reportservice.export.PdfEndpoints;
import com.example.reportservice.export.PdfRenderer;
import com.example.reportservice.json.Json;
import com.example.reportservice.model.ModelEndpoints;
import com.example.reportservice.openremote.ManagerClient;
import com.example.reportservice.openremote.ServiceRegistration;
import com.example.reportservice.report.ReportEndpoints;
import com.example.reportservice.web.Router;
import com.example.reportservice.web.StaticHandler;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Path;
import java.time.Clock;
import java.time.Duration;
import java.util.concurrent.Executors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * OpenRemote external service: serves the report web interface, live OpenRemote data, the saved reports and the PDFs of
 * reports, and keeps a lease on the manager registry. See README.md for the settings.
 */
public final class ReportService {

    private static final Logger LOG = LoggerFactory.getLogger(ReportService.class);
    private static final String SERVICE_ID = "report-service";
    private static final Duration HEARTBEAT = Duration.ofSeconds(20);

    private ReportService() { }

    public static void main(String[] args) throws IOException {
        Config config;
        try {
            config = Config.load();
        } catch (IllegalArgumentException e) {
            LOG.error("Invalid configuration: {}", e.getMessage());
            System.exit(1);
            return;
        }

        ManagerClient manager = new ManagerClient(config);
        HttpServer server =
                startServer(config.port(), manager, config.reportsDir(), config.chromePath(), config.insecureTls());
        ServiceRegistration registration =
                new ServiceRegistration(manager, describeService(config), config.globalService(), HEARTBEAT);
        registration.start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            registration.stop();
            server.stop(0);
        }));
        LOG.info("Saved reports are kept in {}", config.reportsDir().toAbsolutePath());
        LOG.info("Listening on http://localhost:{}/", config.port());
    }

    /**
     * What the service tells the manager about itself. The address of a global service ends in {@code {realm}}, which
     * the manager replaces with the realm that is open in its UI: with the realm name for a super user
     * ({@code /manufacturer}) and with {@code ?realm=manufacturer} for other users.
     */
    static ObjectNode describeService(Config config) throws IOException {
        String homepage = "http://localhost:" + config.port() + (config.globalService() ? "/{realm}" : "/");
        return Json.object()
                .put("serviceId", SERVICE_ID)
                .put("label", "Report Studio")
                .put("icon", "file-chart")
                .put("version", BuildInfo.version())
                .put("homepageUrl", homepage)
                .put("status", "AVAILABLE");
    }

    /**
     * Starts the server for the data endpoints, the saved reports, the PDF export and, for every other path, the web
     * interface. The reports are kept in {@code reportsDir}. The PDFs are made by the browser that {@code chromePath}
     * names, or else by one that is found on the system.
     */
    static HttpServer startServer(int port, ManagerClient manager, Path reportsDir, String chromePath,
            boolean insecureTls) throws IOException {
        ReportEndpoints reports = new ReportEndpoints(reportsDir, Clock.systemUTC(), manager.realm());
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", port), 0);
        // the browser opens the web interface at this address, which is why the port is known only now
        String address = "http://127.0.0.1:" + server.getAddress().getPort();
        PdfRenderer pdf = BrowserLocator.find(chromePath)
                .<PdfRenderer>map(browser -> new ChromiumPdfRenderer(browser, address, insecureTls))
                .orElse(PdfEndpoints.UNAVAILABLE);

        Router router = new Router(new StaticHandler());
        new AssetEndpoints(manager).register(router);
        new BrandingEndpoints(manager).register(router);
        new DatapointEndpoints(manager).register(router);
        new ModelEndpoints(manager).register(router);
        new PdfEndpoints(pdf).register(router);
        reports.register(router);

        server.setExecutor(Executors.newThreadPerTaskExecutor(Thread.ofVirtual().name("http-", 1).factory()));
        router.register(server);
        server.start();
        return server;
    }
}
