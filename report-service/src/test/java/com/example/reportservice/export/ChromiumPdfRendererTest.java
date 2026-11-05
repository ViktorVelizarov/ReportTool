package com.example.reportservice.export;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.example.reportservice.json.Json;
import com.example.reportservice.support.Pdfs;
import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.Set;
import java.util.TreeSet;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

/**
 * Drives a real browser, so these tests are skipped on a machine that has none. They open small pages of their own that
 * play the part of {@code render.html}, which is tested together with the real web interface in
 * {@code ReportServiceTest}.
 */
class ChromiumPdfRendererTest {

    private static final JsonNode REPORT = report();

    /** Says what it was given in its error, which is the way for a page to tell a test what it saw. */
    private static final String ECHO = """
            <!doctype html><title>t</title>
            <script>
              const request = window.reportRenderRequest;
              window.reportRenderResult = { error: JSON.stringify({
                width: request.width,
                innerWidth: window.innerWidth,
                name: request.report.name,
                template: request.report.template.id,
                print: matchMedia('print').matches,
                search: location.search
              }) };
            </script>""";

    /** A page of 3000 pixels, which is printed at half its size: the paper then holds 1436 pixels of it. */
    private static final String TALL = """
            <!doctype html><title>t</title>
            <style>@page { size: A4 landscape; margin: 10mm; } body { margin: 0; } div { height: 3000px; }</style>
            <div>tall</div>
            <script>
              document.title = window.reportRenderRequest.report.name;
              window.reportRenderResult = { scale: 0.5 };
            </script>""";

    private static final String NEVER_DRAWN = "<!doctype html><title>t</title><p>no answer";

    private static JsonNode report() {
        try {
            return Json.read("{\"name\":\"Weekly report\",\"template\":{\"id\":\"t-1\"}}"
                    .getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            throw new AssertionError(e);
        }
    }

    private static Path browser() {
        return BrowserLocator.find(null).orElse(null);
    }

    /** A renderer that opens the page of the test server, and gives up after the seconds. */
    private static ChromiumPdfRenderer renderer(Path browser, TestServer page, int seconds) {
        return new ChromiumPdfRenderer(browser, page.url(), false, Duration.ofSeconds(seconds));
    }

    private static TestServer serving(String html) throws IOException {
        return new TestServer(server -> server.createContext("/render.html", exchange -> {
            byte[] body = html.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=utf-8");
            exchange.sendResponseHeaders(200, body.length);
            exchange.getResponseBody().write(body);
            exchange.close();
        }));
    }

    private static Set<String> profiles() throws IOException {
        Set<String> names = new TreeSet<>();
        try (DirectoryStream<Path> found = Files.newDirectoryStream(
                Path.of(System.getProperty("java.io.tmpdir")), "report-studio-browser-*")) {
            found.forEach(path -> names.add(path.getFileName().toString()));
        }
        return names;
    }

    @Test
    void printsThePageAtTheScaleThatThePageAsksForAndLeavesNothingBehind() throws Exception {
        Path browser = browser();
        assumeTrue(browser != null, "needs Chrome, Chromium or Edge");
        Set<String> before = profiles();

        try (TestServer page = serving(TALL)) {
            byte[] pdf = renderer(browser, page, 30).render(null, 1280, REPORT);

            assertTrue(Pdfs.isPdf(pdf));
            assertEquals(3, Pdfs.pageCount(pdf), "2 pages if it were printed at its own size");
            assertEquals("Weekly report", Pdfs.title(pdf));
        }
        assertEquals(before, profiles(), "the profile of the browser is removed");
    }

    @Test
    void opensThePageOfTheRealmWithTheReportInAWindowAsWideAsTheLayoutWithTheRulesForPrint() throws Exception {
        Path browser = browser();
        assumeTrue(browser != null, "needs Chrome, Chromium or Edge");

        try (TestServer page = serving(ECHO)) {
            ApiException e = assertThrows(ApiException.class,
                    () -> renderer(browser, page, 30).render("manufacturer", 1000, REPORT));

            assertEquals(502, e.status());
            String seen = e.getMessage();
            assertTrue(seen.startsWith("The PDF could not be made: The report could not be drawn: "), seen);
            for (String expected : new String[] {
                "\"width\":1000", "\"innerWidth\":1000", "\"name\":\"Weekly report\"", "\"template\":\"t-1\"",
                "\"print\":true", "\"search\":\"?realm=manufacturer\""}) {
                assertTrue(seen.contains(expected), expected + " in " + seen);
            }
        }
    }

    @Test
    void givesUpOnAPageThatIsNeverDrawn() throws Exception {
        Path browser = browser();
        assumeTrue(browser != null, "needs Chrome, Chromium or Edge");
        Set<String> before = profiles();

        try (TestServer page = serving(NEVER_DRAWN)) {
            ApiException e = assertThrows(ApiException.class,
                    () -> renderer(browser, page, 5).render(null, 1280, REPORT));

            assertEquals(502, e.status());
            assertTrue(e.getMessage().contains("not drawn in time"), e.getMessage());
        }
        assertEquals(before, profiles(), "the browser is ended and its profile removed");
    }

    @Test
    void saysSoWhenTheBrowserCannotBeStarted(@TempDir Path folder) throws Exception {
        Path notABrowser = Files.writeString(folder.resolve("chrome"), "not a program");

        ApiException e = assertThrows(ApiException.class,
                () -> new ChromiumPdfRenderer(notABrowser, "http://127.0.0.1:1", false).render(null, 1280, REPORT));

        assertEquals(502, e.status());
        assertTrue(e.getMessage().startsWith("The PDF could not be made: "), e.getMessage());
    }
}
