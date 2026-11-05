package com.example.reportservice.export;

import com.example.reportservice.json.Json;
import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Makes the PDF of a report with a headless browser that is built on Chromium, which prints the web interface itself,
 * so that the PDF shows the charts exactly as the author saw them. For every PDF it starts a browser with a profile
 * of its own, opens {@code /render.html} of this service in it and has it print the page.
 *
 * <p>The browser is driven over the DevTools protocol (see {@link DevTools}). Before the page starts, this class sets
 * {@code window.reportRenderRequest} to {@code {width, report}} in it, where report is the report that was posted and
 * width the width that the report has in Preview, and the page answers in {@code window.reportRenderResult} with
 * {@code {scale}} when it is drawn, or {@code {error}}. The page is printed at that scale, which makes the layout as
 * wide as the paper (see {@code js/render.js} in the frontend). The page is laid out as for print, in a window as wide
 * as the report is in Preview, so that the PDF looks as the report does there.
 */
public final class ChromiumPdfRenderer implements PdfRenderer {

    private static final Logger LOG = LoggerFactory.getLogger(ChromiumPdfRenderer.class);
    private static final Duration TIMEOUT = Duration.ofSeconds(60);
    private static final Duration POLL = Duration.ofMillis(100);
    private static final int MAX_BROWSERS = 2;
    private static final double MIN_SCALE = 0.1;
    private static final double MAX_SCALE = 2;

    private final Path browser;
    private final String address;
    private final boolean insecureTls;
    private final Duration timeout;
    private final Semaphore browsers = new Semaphore(MAX_BROWSERS);

    /**
     * @param browser     the executable of the browser
     * @param address     where this service can be reached, such as {@code http://127.0.0.1:5000}; the browser opens
     *                    the page there
     * @param insecureTls whether the browser accepts any TLS certificate, as the service does for the manager: the
     *                    logo of a realm may be on a manager with a self-signed certificate
     */
    public ChromiumPdfRenderer(Path browser, String address, boolean insecureTls) {
        this(browser, address, insecureTls, TIMEOUT);
    }

    ChromiumPdfRenderer(Path browser, String address, boolean insecureTls, Duration timeout) {
        this.browser = browser;
        this.address = address;
        this.insecureTls = insecureTls;
        this.timeout = timeout;
    }

    @Override
    public byte[] render(String realm, int width, JsonNode report) throws InterruptedException {
        if (!browsers.tryAcquire(timeout.toMillis(), TimeUnit.MILLISECONDS)) {
            throw new ApiException(503, "Too many PDFs are being made: try again in a moment");
        }
        Instant started = Instant.now();
        try {
            byte[] pdf = makePdf(realm, width, report, started.plus(timeout));
            long millis = Duration.between(started, Instant.now()).toMillis();
            LOG.info("Made a PDF of {} KB in {} ms", pdf.length / 1024, millis);
            return pdf;
        } catch (IOException e) {
            LOG.warn("Could not make a PDF: {}", e.getMessage());
            throw new ApiException(502, "The PDF could not be made: " + e.getMessage());
        } finally {
            browsers.release();
        }
    }

    private byte[] makePdf(String realm, int width, JsonNode report, Instant deadline)
            throws IOException, InterruptedException {
        Path profile = Files.createTempDirectory("report-studio-browser-");
        Process process = null;
        try {
            process = start(profile);
            URI endpoint = awaitEndpoint(profile, process, deadline);
            try (DevTools devTools = DevTools.connect(endpoint, deadline)) {
                try {
                    return print(devTools, realm, width, report, deadline);
                } finally {
                    devTools.quitBrowser();
                }
            }
        } finally {
            stop(process);
            delete(profile);
        }
    }

    private Process start(Path profile) throws IOException {
        List<String> command = new ArrayList<>(List.of(
                browser.toString(),
                "--headless=new",
                "--remote-debugging-port=0",
                "--user-data-dir=" + profile,
                "--no-first-run",
                "--no-default-browser-check",
                "--disable-extensions",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--hide-scrollbars",
                "--mute-audio"));
        if (insecureTls) {
            command.add("--ignore-certificate-errors");
        }
        command.add("about:blank");
        return new ProcessBuilder(command)
                .redirectErrorStream(true)
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .start();
    }

    /**
     * The WebSocket address of the browser. It starts listening on a port that it chooses, and then writes the port and
     * the path of the address in {@code DevToolsActivePort}, in its profile.
     */
    private static URI awaitEndpoint(Path profile, Process process, Instant deadline)
            throws IOException, InterruptedException {
        Path file = profile.resolve("DevToolsActivePort");
        while (Instant.now().isBefore(deadline)) {
            if (!process.isAlive()) {
                throw new IOException("The browser stopped at once (exit code " + process.exitValue() + ")");
            }
            List<String> lines = readLines(file);
            if (lines.size() >= 2) {
                return URI.create("ws://127.0.0.1:" + lines.get(0).strip() + lines.get(1).strip());
            }
            Thread.sleep(50);
        }
        throw new IOException("The browser did not start in time");
    }

    /** The lines of the file; none when it is not there yet, or the browser still has it open (as on Windows). */
    private static List<String> readLines(Path file) {
        try {
            return Files.readAllLines(file);
        } catch (IOException e) {
            return List.of();
        }
    }

    private byte[] print(DevTools devTools, String realm, int width, JsonNode report, Instant deadline)
            throws IOException, InterruptedException {
        devTools.onEvent(ChromiumPdfRenderer::logPageProblem);
        String target = devTools.call("Target.createTarget", Json.object().put("url", "about:blank"))
                .path("targetId").asText();
        String session = devTools.call("Target.attachToTarget",
                Json.object().put("targetId", target).put("flatten", true)).path("sessionId").asText();
        devTools.call(session, "Runtime.enable", null);
        devTools.call(session, "Page.enable", null);
        // the page is laid out as it is printed: in a window as wide as the layout, with the rules for print
        devTools.call(session, "Emulation.setDeviceMetricsOverride", Json.object()
                .put("width", width).put("height", 900).put("deviceScaleFactor", 2).put("mobile", false));
        devTools.call(session, "Emulation.setEmulatedMedia", Json.object().put("media", "print"));
        devTools.call(session, "Page.addScriptToEvaluateOnNewDocument",
                Json.object().put("source", requestScript(width, report)));
        JsonNode navigation = devTools.call(session, "Page.navigate", Json.object().put("url", pageAddress(realm)));
        if (navigation.hasNonNull("errorText")) {
            throw new IOException("The report page did not open: " + navigation.get("errorText").asText());
        }

        double scale = awaitScale(devTools, session, deadline);
        JsonNode printed = devTools.call(session, "Page.printToPDF", Json.object()
                .put("printBackground", true)
                .put("preferCSSPageSize", true)
                .put("scale", scale)
                .put("transferMode", "ReturnAsBase64"));
        return Base64.getDecoder().decode(printed.path("data").asText());
    }

    private String pageAddress(String realm) {
        return address + "/render.html" + (realm == null ? "" : "?realm=" + realm);
    }

    /** The script that gives the page its request before the page starts. */
    private static String requestScript(int width, JsonNode report) throws IOException {
        ObjectNode request = Json.object().put("width", width);
        request.set("report", report);
        // the JSON of the request as the text of a string, which the page parses
        String text = new String(Json.write(new String(Json.write(request), StandardCharsets.UTF_8)),
                StandardCharsets.UTF_8);
        return "window.reportRenderRequest = JSON.parse(" + text + ");";
    }

    /** Waits until the page says that the report is drawn, and gives the scale that it asks for. */
    private static double awaitScale(DevTools devTools, String session, Instant deadline)
            throws IOException, InterruptedException {
        ObjectNode ask = Json.object()
                .put("expression", "JSON.stringify(window.reportRenderResult ?? null)")
                .put("returnByValue", true);
        while (Instant.now().isBefore(deadline)) {
            JsonNode result = null;
            try {
                JsonNode evaluated = devTools.call(session, "Runtime.evaluate", ask);
                String answer = evaluated.path("result").path("value").asText("null");
                result = Json.read(answer.getBytes(StandardCharsets.UTF_8));
            } catch (DevTools.CommandFailedException e) {
                // the page has no script context yet
            }
            if (result != null && !result.isNull()) {
                if (result.hasNonNull("error")) {
                    throw new IOException("The report could not be drawn: " + result.get("error").asText());
                }
                double scale = result.path("scale").asDouble();
                if (!(scale >= MIN_SCALE && scale <= MAX_SCALE)) {
                    throw new IOException("The report page asked for a scale of " + scale);
                }
                return scale;
            }
            Thread.sleep(POLL.toMillis());
        }
        throw new IOException("The report was not drawn in time");
    }

    /** What the page says in its console about an error, for the log: a widget that fails does not stop the PDF. */
    private static void logPageProblem(JsonNode event) {
        String method = event.path("method").asText();
        JsonNode params = event.path("params");
        if ("Runtime.exceptionThrown".equals(method)) {
            JsonNode details = params.path("exceptionDetails");
            LOG.warn("The report page threw an exception: {}",
                    details.path("exception").path("description").asText(details.path("text").asText()));
        } else if ("Runtime.consoleAPICalled".equals(method) && "error".equals(params.path("type").asText())) {
            StringBuilder text = new StringBuilder();
            params.path("args").forEach(arg ->
                    text.append(arg.path("value").asText(arg.path("description").asText())).append(' '));
            LOG.warn("The report page logged an error: {}", text.toString().strip());
        }
    }

    /** Gives the browser a moment to quit, which it does when told to, and ends it and its helpers if it does not. */
    private static void stop(Process process) throws InterruptedException {
        if (process == null) {
            return;
        }
        if (!process.waitFor(3, TimeUnit.SECONDS)) {
            process.descendants().forEach(ProcessHandle::destroyForcibly);
            process.destroyForcibly();
            process.waitFor(5, TimeUnit.SECONDS);
        }
    }

    /** Removes the profile of the browser. The browser may still hold a file for a moment, so it tries again. */
    private static void delete(Path profile) throws InterruptedException {
        for (int attempt = 0; attempt < 10; attempt++) {
            try (Stream<Path> files = Files.walk(profile)) {
                files.sorted(Comparator.reverseOrder()).forEach(path -> path.toFile().delete());
            } catch (IOException e) {
                LOG.debug("Could not read {}: {}", profile, e.getMessage());
            }
            if (!Files.exists(profile)) {
                return;
            }
            Thread.sleep(200);
        }
        LOG.warn("Could not remove the profile of the browser: {}", profile);
    }
}
