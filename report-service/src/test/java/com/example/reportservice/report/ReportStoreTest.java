package com.example.reportservice.report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.json.Json;
import com.example.reportservice.web.ApiException;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class ReportStoreTest {

    /** "Zurich - water report" with an umlaut, a dash and Japanese characters; the sources of the service are ASCII. */
    private static final String UNICODE_NAME = "Z\u00fcrich \u2013 \u6c34\u306e\u5831\u544a";

    /** A clock that tells the time it was set to. */
    private static final class TestClock extends Clock {
        private volatile long millis = 1_000;

        @Override
        public ZoneId getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(ZoneId zone) {
            return this;
        }

        @Override
        public Instant instant() {
            return Instant.ofEpochMilli(millis);
        }
    }

    @TempDir
    Path folder;

    private final TestClock clock = new TestClock();
    private Path root;
    private ReportStore store;

    @BeforeEach
    void setUp() throws IOException {
        root = folder.resolve("reports");
        store = new ReportStore(root, clock);
    }

    private static ReportDraft draft(String name) throws IOException {
        return draft(name, "last7");
    }

    private static ReportDraft draft(String name, String periodId) throws IOException {
        String body = """
                {"name":"%s","periodId":"%s","template":{"id":"t","widgets":[{"id":"w1"}]},
                 "instructions":{"subject":"The irrigation","focus":"Low tanks"},"schedule":null}"""
                .formatted(name, periodId);
        return ReportDraft.of(Json.read(body.getBytes(StandardCharsets.UTF_8)));
    }

    private static List<String> names(List<ReportSummary> reports) {
        return reports.stream().map(ReportSummary::name).toList();
    }

    @Test
    void makesItsFolderAndKeepsEachReportInAFileOfItsOwn() throws Exception {
        assertTrue(Files.isDirectory(root));

        ReportSummary saved = store.create("manufacturer", draft("Weekly"));

        assertTrue(ReportStore.ID.matcher(saved.id()).matches(), saved.id());
        assertEquals("Weekly", saved.name());
        assertEquals(1_000, saved.updatedAt());
        Path file = root.resolve("manufacturer").resolve(saved.id() + ".json");
        assertTrue(Files.isRegularFile(file));
        assertTrue(Json.read(Files.readAllBytes(file)).get("schedule").isNull());
    }

    @Test
    void givesBackEverythingThatWasSaved() throws Exception {
        ReportSummary saved = store.create("manufacturer", draft("Weekly", "last30"));

        SavedReport report = store.find("manufacturer", saved.id()).orElseThrow();

        assertEquals(saved.id(), report.id());
        assertEquals("Weekly", report.name());
        assertEquals("last30", report.periodId());
        assertEquals("w1", report.template().get("widgets").get(0).get("id").asText());
        assertEquals("Low tanks", report.instructions().get("focus").asText());
        assertEquals(1_000, report.createdAt());
        assertEquals(1_000, report.updatedAt());
    }

    @Test
    void failsToStartWhenItsFolderCannotBeMade() throws Exception {
        Path file = Files.writeString(folder.resolve("a-file"), "not a folder");

        IOException e = assertThrows(IOException.class, () -> new ReportStore(file, clock));

        assertTrue(e.getMessage().contains("for the saved reports"), e.getMessage());
    }

    @Test
    void listsTheReportsOfARealmByNameWhateverTheCase() throws Exception {
        store.create("manufacturer", draft("beta"));
        store.create("manufacturer", draft("Alpha"));
        store.create("manufacturer", draft("Charlie"));

        assertEquals(List.of("Alpha", "beta", "Charlie"), names(store.list("manufacturer")));
    }

    @Test
    void keepsTheReportsOfEachRealmApart() throws Exception {
        ReportSummary weekly = store.create("manufacturer", draft("Weekly"));
        store.create("smartcity", draft("Weekly"));
        store.create("smartcity", draft("Monthly"));

        assertEquals(List.of("Weekly"), names(store.list("manufacturer")));
        assertEquals(List.of("Monthly", "Weekly"), names(store.list("smartcity")));
        assertEquals(List.of(), store.list("building"));
        assertTrue(store.find("smartcity", weekly.id()).isEmpty());
    }

    @Test
    void saysThatThereIsNoSuchReportInsteadOfFailing() throws Exception {
        assertTrue(store.find("manufacturer", UUID.randomUUID().toString()).isEmpty());

        ApiException e = assertThrows(ApiException.class,
                () -> store.update("manufacturer", UUID.randomUUID().toString(), draft("Weekly")));

        assertEquals(404, e.status());
        assertEquals(List.of(), store.list("manufacturer"));
    }

    @Test
    void savesAReportAgainWhereItIsEvenWhenItsNameChanges() throws Exception {
        ReportSummary saved = store.create("manufacturer", draft("Weekly", "last7"));
        clock.millis = 5_000;

        ReportSummary updated = store.update("manufacturer", saved.id(), draft("Monthly", "last30"));

        assertEquals(saved.id(), updated.id());
        assertEquals("Monthly", updated.name());
        assertEquals(5_000, updated.updatedAt());
        assertEquals(List.of("Monthly"), names(store.list("manufacturer")));
        SavedReport report = store.find("manufacturer", saved.id()).orElseThrow();
        assertEquals("last30", report.periodId());
        assertEquals(1_000, report.createdAt(), "it was first saved when it was first saved");
        assertEquals(5_000, report.updatedAt());
        try (Stream<Path> files = Files.list(root.resolve("manufacturer"))) {
            assertEquals(1, files.count(), "no file is left over");
        }
    }

    @Test
    void letsAReportKeepItsNameWhenItIsSavedAgain() throws Exception {
        ReportSummary saved = store.create("manufacturer", draft("Weekly"));

        ReportSummary updated = store.update("manufacturer", saved.id(), draft("WEEKLY", "last30"));

        assertEquals("WEEKLY", updated.name());
        assertEquals(1, store.list("manufacturer").size());
    }

    @Test
    void refusesANameThatAnotherReportOfTheRealmHas() throws Exception {
        store.create("manufacturer", draft("Weekly"));
        ReportSummary monthly = store.create("manufacturer", draft("Monthly"));

        ApiException added = assertThrows(ApiException.class, () -> store.create("manufacturer", draft(" weekly ")));
        ApiException renamed = assertThrows(ApiException.class,
                () -> store.update("manufacturer", monthly.id(), draft("WEEKLY")));

        assertEquals(409, added.status());
        assertEquals(409, renamed.status());
        assertEquals(List.of("Monthly", "Weekly"), names(store.list("manufacturer")));
        store.create("smartcity", draft("Weekly")); // another realm has its own names
    }

    @Test
    void savesOneOfManyReportsThatAreSavedUnderTheSameNameAtOnce() throws Exception {
        int callers = 12;
        CountDownLatch start = new CountDownLatch(1);
        ExecutorService pool = Executors.newFixedThreadPool(callers);
        try {
            List<Future<Boolean>> results = new ArrayList<>();
            for (int i = 0; i < callers; i++) {
                results.add(pool.submit(() -> {
                    start.await();
                    try {
                        store.create("manufacturer", draft("Weekly"));
                        return true;
                    } catch (ApiException e) {
                        assertEquals(409, e.status());
                        return false;
                    }
                }));
            }
            start.countDown();
            int saved = 0;
            for (Future<Boolean> result : results) {
                saved += result.get() ? 1 : 0;
            }
            assertEquals(1, saved);
        } finally {
            pool.shutdownNow();
        }
        assertEquals(List.of("Weekly"), names(store.list("manufacturer")));
    }

    @Test
    void skipsFilesThatAreNotSavedReportsSoTheyCannotHideTheOthers() throws Exception {
        ReportSummary saved = store.create("manufacturer", draft("Weekly"));
        Path realm = root.resolve("manufacturer");
        String broken = UUID.randomUUID().toString();
        Files.writeString(realm.resolve(broken + ".json"), "{ this is not JSON");
        Files.writeString(realm.resolve(UUID.randomUUID() + ".json"), "null");
        Files.writeString(realm.resolve(UUID.randomUUID() + ".json"), "{}");
        Files.writeString(realm.resolve(UUID.randomUUID() + ".json"), "[]");
        String copy = "{\"id\":\"" + saved.id() + "\",\"name\":\"Copy\"}"; // in a file that is named after another ID
        Files.writeString(realm.resolve(UUID.randomUUID() + ".json"), copy);
        Files.writeString(realm.resolve("notes.json"), "{\"id\":\"notes\",\"name\":\"Notes\"}");
        Files.writeString(realm.resolve("readme.txt"), "hello");

        assertEquals(List.of("Weekly"), names(store.list("manufacturer")));
        assertThrows(UncheckedIOException.class, () -> store.find("manufacturer", broken));
    }

    @Test
    void refusesARealmOrAnIdThatCouldLeaveItsFolder() {
        for (String realm : List.of("..", "a/b", "a\\b", "", "a b", "../manufacturer")) {
            assertThrows(IllegalArgumentException.class, () -> store.list(realm), realm);
        }
        for (String id : List.of("..", "../x", "x", "", UUID.randomUUID().toString().toUpperCase())) {
            assertThrows(IllegalArgumentException.class, () -> store.find("manufacturer", id), id);
        }
        assertFalse(Files.exists(folder.resolve("x")));
    }

    @Test
    void keepsNamesInAnyScriptAsTheyAre() throws Exception {
        ReportSummary saved = store.create("manufacturer", draft(UNICODE_NAME));

        assertEquals(UNICODE_NAME, store.find("manufacturer", saved.id()).orElseThrow().name());
        assertTrue(Files.readString(root.resolve("manufacturer").resolve(saved.id() + ".json"))
                .contains(UNICODE_NAME), "the file is UTF-8");
    }
}
