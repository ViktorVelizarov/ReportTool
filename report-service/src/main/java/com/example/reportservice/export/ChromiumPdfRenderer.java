package com.example.reportservice.export;

import com.example.reportservice.json.Json;
import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.PlaywrightException;
import com.microsoft.playwright.TimeoutError;
import com.microsoft.playwright.options.Media;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Makes the PDF of a report with Playwright's Chromium, which prints the web interface itself, so that the PDF shows
 * the charts exactly as the author saw them. For every PDF it starts Playwright and a browser of their own, opens
 * {@code /render.html} of this service in it and has it print the page.
 *
 * <p>Before the page starts, this class sets {@code window.reportRenderRequest} to {@code {width, report}} in it, where
 * report is the report that was posted and width the width that the report has in Preview, and the page answers in
 * {@code window.reportRenderResult} with {@code {scale}} when it is drawn, or {@code {error}}. The page is printed at
 * that scale, which makes the layout as wide as the paper (see {@code js/render.js} in the frontend). The page is laid
 * out as for print, in a window as wide as the report is in Preview, so that the PDF looks as the report does there.
 *
 * <p>Playwright is not thread safe, so every PDF has a Playwright of its own that only the thread making it uses.
 */
public final class ChromiumPdfRenderer implements PdfRenderer {

    private static final Logger LOG = LoggerFactory.getLogger(ChromiumPdfRenderer.class);
    private static final Duration TIMEOUT = Duration.ofSeconds(60);
    private static final int MAX_BROWSERS = 2;
    private static final double MIN_SCALE = 0.1;
    private static final double MAX_SCALE = 2;

    /** The full Chromium in the new headless mode, as Chrome runs headless, not Playwright's headless shell. */
    private static final String CHANNEL = "chromium";

    /**
     * Playwright downloads its browsers the first time it starts unless this is set: the service never does, the
     * browser is installed beforehand (see README.md, PDF export).
     */
    private static final Map<String, String> PLAYWRIGHT_ENV = Map.of("PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD", "1");

    private final String address;
    private final boolean insecureTls;
    private final Duration timeout;
    private final Map<String, String> env;
    private final Semaphore browsers = new Semaphore(MAX_BROWSERS);

    /**
     * @param address     where this service can be reached, such as {@code http://127.0.0.1:5000}; the browser opens
     *                    the page there
     * @param insecureTls whether the browser accepts any TLS certificate, as the service does for the manager: the
     *                    logo of a realm may be on a manager with a self-signed certificate
     */
    public ChromiumPdfRenderer(String address, boolean insecureTls) {
        this(address, insecureTls, TIMEOUT, Map.of());
    }

    /** With the time that a PDF may take, and settings for Playwright, such as where it looks for its browsers. */
    ChromiumPdfRenderer(String address, boolean insecureTls, Duration timeout, Map<String, String> playwrightEnv) {
        this.address = address;
        this.insecureTls = insecureTls;
        this.timeout = timeout;
        this.env = new HashMap<>(PLAYWRIGHT_ENV);
        this.env.putAll(playwrightEnv);
    }

    /** Whether Playwright's Chromium is installed; the log says which one makes the PDFs, or that none is there. */
    public static boolean isInstalled() {
        try (Playwright playwright = Playwright.create(new Playwright.CreateOptions().setEnv(PLAYWRIGHT_ENV))) {
            Path browser = Path.of(playwright.chromium().executablePath());
            if (Files.isRegularFile(browser)) {
                LOG.info("PDF export uses {}", browser);
                return true;
            }
            LOG.warn("Playwright's Chromium is not installed at {}: PDF export is off. "
                    + "Install it with ./gradlew installBrowser (see README.md, PDF export)", browser);
        } catch (PlaywrightException e) {
            LOG.warn("Playwright cannot start, so PDF export is off: {}", e.getMessage());
        }
        return false;
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

    private byte[] makePdf(String realm, int width, JsonNode report, Instant deadline) throws IOException {
        try (Playwright playwright = Playwright.create(new Playwright.CreateOptions().setEnv(env));
             Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
                     .setChannel(CHANNEL)
                     .setArgs(List.of("--disable-gpu", "--disable-dev-shm-usage", "--hide-scrollbars"))
                     .setTimeout(millisLeft(deadline)))) {
            // the page is laid out as it is printed: in a window as wide as the layout, with the rules for print
            Page page = browser.newPage(new Browser.NewPageOptions()
                    .setViewportSize(width, 900)
                    .setDeviceScaleFactor(2)
                    .setIgnoreHTTPSErrors(insecureTls));
            page.setDefaultTimeout(millisLeft(deadline));
            page.onPageError(error -> LOG.warn("The report page threw an exception: {}", error));
            page.onConsoleMessage(message -> {
                if ("error".equals(message.type())) {
                    LOG.warn("The report page logged an error: {}", message.text());
                }
            });
            page.emulateMedia(new Page.EmulateMediaOptions().setMedia(Media.PRINT));
            page.addInitScript(requestScript(width, report));
            page.navigate(pageAddress(realm));

            double scale = awaitScale(page, deadline);
            return page.pdf(new Page.PdfOptions()
                    .setPrintBackground(true)
                    .setPreferCSSPageSize(true)
                    .setScale(scale));
        } catch (PlaywrightException e) {
            throw new IOException(e.getMessage(), e);
        }
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
    private static double awaitScale(Page page, Instant deadline) throws IOException {
        try {
            page.waitForFunction("() => window.reportRenderResult", null,
                    new Page.WaitForFunctionOptions().setTimeout(millisLeft(deadline)));
        } catch (TimeoutError e) {
            throw new IOException("The report was not drawn in time", e);
        }
        String answer = (String) page.evaluate("JSON.stringify(window.reportRenderResult)");
        JsonNode result = Json.read(answer.getBytes(StandardCharsets.UTF_8));
        if (result.hasNonNull("error")) {
            throw new IOException("The report could not be drawn: " + result.get("error").asText());
        }
        double scale = result.path("scale").asDouble();
        if (!(scale >= MIN_SCALE && scale <= MAX_SCALE)) {
            throw new IOException("The report page asked for a scale of " + scale);
        }
        return scale;
    }

    /** The time left until the deadline in milliseconds, at least 1: Playwright reads a timeout of 0 as none. */
    private static double millisLeft(Instant deadline) {
        return Math.max(1, Duration.between(Instant.now(), deadline).toMillis());
    }

}
