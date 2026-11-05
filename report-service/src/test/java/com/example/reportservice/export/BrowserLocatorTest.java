package com.example.reportservice.export;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class BrowserLocatorTest {

    @Test
    void looksForChromeAndThenEdgeInTheFoldersOfWindows() {
        Map<String, String> env = Map.of(
                "ProgramFiles", "C:\\Program Files",
                "ProgramFiles(x86)", "C:\\Program Files (x86)",
                "LOCALAPPDATA", "C:\\Users\\me\\AppData\\Local");

        assertEquals(List.of(
                Path.of("C:\\Program Files", "Google", "Chrome", "Application", "chrome.exe"),
                Path.of("C:\\Program Files (x86)", "Google", "Chrome", "Application", "chrome.exe"),
                Path.of("C:\\Users\\me\\AppData\\Local", "Google", "Chrome", "Application", "chrome.exe"),
                Path.of("C:\\Program Files (x86)", "Microsoft", "Edge", "Application", "msedge.exe"),
                Path.of("C:\\Program Files", "Microsoft", "Edge", "Application", "msedge.exe")),
                BrowserLocator.candidates("Windows 11", env::get));
    }

    @Test
    void skipsTheFoldersOfWindowsThatTheSystemDoesNotHave() {
        assertEquals(
                List.of(Path.of("D:\\Apps", "Google", "Chrome", "Application", "chrome.exe")),
                BrowserLocator.candidates("Windows 10", Map.of("LOCALAPPDATA", "D:\\Apps")::get));
        assertTrue(BrowserLocator.candidates("Windows 10", name -> null).isEmpty());
    }

    @Test
    void looksForChromeFirstOnMacAndLinuxToo() {
        assertEquals(Path.of("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
                BrowserLocator.candidates("Mac OS X", name -> null).get(0));
        assertEquals(Path.of("/usr/bin/google-chrome"), BrowserLocator.candidates("Linux", name -> null).get(0));
        assertTrue(BrowserLocator.candidates("Linux", name -> null).contains(Path.of("/usr/bin/chromium")));
    }

    @Test
    void usesTheBrowserThatIsConfigured(@TempDir Path folder) throws IOException {
        Path browser = Files.createFile(folder.resolve("chrome"));

        assertEquals(Optional.of(browser), BrowserLocator.find(browser.toString()));
    }

    @Test
    void doesNotLookElsewhereWhenTheConfiguredBrowserIsMissing(@TempDir Path folder) {
        assertEquals(Optional.empty(), BrowserLocator.find(folder.resolve("missing").toString()));
        assertEquals(Optional.empty(), BrowserLocator.find(folder.toString()), "a folder is not a browser");
    }
}
