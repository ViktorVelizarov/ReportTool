package com.example.reportservice.export;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.function.UnaryOperator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Finds the browser that makes the PDFs: the one that {@code CHROME_PATH} names, else Chrome, Edge or Chromium where
 * they are normally installed. Any browser that is built on Chromium will do.
 */
public final class BrowserLocator {

    private static final Logger LOG = LoggerFactory.getLogger(BrowserLocator.class);

    private BrowserLocator() { }

    /** The browser to use, or empty, with a warning in the log, when there is none. */
    public static Optional<Path> find(String configured) {
        if (configured != null) {
            Path path = Path.of(configured);
            if (Files.isRegularFile(path)) {
                LOG.info("PDF export uses {}", path);
                return Optional.of(path);
            }
            LOG.warn("CHROME_PATH is {}, which is not a file: PDF export is off", configured);
            return Optional.empty();
        }
        Optional<Path> found = candidates(System.getProperty("os.name"), System::getenv).stream()
                .filter(Files::isRegularFile)
                .findFirst();
        if (found.isPresent()) {
            LOG.info("PDF export uses {}", found.get());
        } else {
            LOG.warn("No Chrome, Chromium or Edge found: PDF export is off. Install one, or set CHROME_PATH");
        }
        return found;
    }

    /** Where Chrome, Edge and Chromium are installed on the system, the best choice first. */
    static List<Path> candidates(String osName, UnaryOperator<String> env) {
        String os = osName.toLowerCase(Locale.ROOT);
        if (os.contains("win")) {
            List<Path> paths = new ArrayList<>();
            addUnder(paths, env.apply("ProgramFiles"), "Google", "Chrome", "Application", "chrome.exe");
            addUnder(paths, env.apply("ProgramFiles(x86)"), "Google", "Chrome", "Application", "chrome.exe");
            addUnder(paths, env.apply("LOCALAPPDATA"), "Google", "Chrome", "Application", "chrome.exe");
            addUnder(paths, env.apply("ProgramFiles(x86)"), "Microsoft", "Edge", "Application", "msedge.exe");
            addUnder(paths, env.apply("ProgramFiles"), "Microsoft", "Edge", "Application", "msedge.exe");
            return paths;
        }
        if (os.contains("mac")) {
            return List.of(
                    Path.of("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
                    Path.of("/Applications/Chromium.app/Contents/MacOS/Chromium"),
                    Path.of("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"));
        }
        return List.of(
                Path.of("/usr/bin/google-chrome"),
                Path.of("/usr/bin/google-chrome-stable"),
                Path.of("/usr/bin/chromium"),
                Path.of("/usr/bin/chromium-browser"),
                Path.of("/usr/bin/microsoft-edge"),
                Path.of("/snap/bin/chromium"));
    }

    private static void addUnder(List<Path> paths, String root, String... parts) {
        if (root != null) {
            paths.add(Path.of(root, parts));
        }
    }
}
