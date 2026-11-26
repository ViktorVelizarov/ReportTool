package com.example.reportservice.report;

import com.example.reportservice.json.Json;
import com.example.reportservice.openremote.Ids;
import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.core.type.TypeReference;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Keeps the saved reports as JSON files, one file for each report in a folder for each realm:
 * {@code <root>/<realm>/<id>.json}. A report is written to a file of its own first and then moved into place, so that
 * a report is never half written. The reports of a realm are the files in its folder, so there is nothing to keep in
 * step and a report can be copied or removed by hand.
 *
 * <p>Within a realm no two reports have the same name, upper and lower case ignored, because the author tells the
 * reports apart by their name. A failure to read or write a file is an {@link UncheckedIOException}, which the router
 * answers with 500.
 */
final class ReportStore {

    /** The ID of a report: the UUID that the store gives it. */
    static final Pattern ID = Pattern.compile("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");

    private static final Logger LOG = LoggerFactory.getLogger(ReportStore.class);
    private static final TypeReference<SavedReport> SAVED_REPORT = new TypeReference<>() { };
    private static final String EXTENSION = ".json";
    private static final Comparator<ReportSummary> BY_NAME =
            Comparator.comparing((ReportSummary report) -> nameKey(report.name())).thenComparing(ReportSummary::id);

    private final Path root;
    private final Clock clock;

    /** @throws IOException if the folder for the reports cannot be made, or is not a folder */
    ReportStore(Path root, Clock clock) throws IOException {
        this.root = root;
        this.clock = clock;
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new IOException("Cannot use " + root.toAbsolutePath() + " for the saved reports: " + e, e);
        }
    }

    /** The reports of the realm, by name. */
    synchronized List<ReportSummary> list(String realm) {
        return readAll(realm).stream().map(SavedReport::summary).sorted(BY_NAME).toList();
    }

    synchronized Optional<SavedReport> find(String realm, String id) {
        Path file = file(realm, id);
        return Files.isRegularFile(file) ? Optional.of(read(file)) : Optional.empty();
    }

    /**
     * Saves a report that is new.
     *
     * @throws ApiException 409 if another report of the realm has the name
     */
    synchronized ReportSummary create(String realm, ReportDraft draft) {
        requireFreeName(realm, draft.name(), null);
        long now = clock.millis();
        SavedReport report = new SavedReport(UUID.randomUUID().toString(), draft.name(), draft.periodId(),
                draft.template(), draft.instructions(), draft.schedule(), now, now);
        write(realm, report);
        return report.summary();
    }

    /**
     * Saves the report again, under the name it now has: the report stays the same report, whatever it is called.
     *
     * @throws ApiException 404 if the realm has no such report, 409 if another report of the realm has the name
     */
    synchronized ReportSummary update(String realm, String id, ReportDraft draft) {
        SavedReport before = find(realm, id).orElseThrow(() -> new ApiException(404, "report not found"));
        requireFreeName(realm, draft.name(), id);
        SavedReport report = new SavedReport(id, draft.name(), draft.periodId(), draft.template(),
                draft.instructions(), draft.schedule(), before.createdAt(), clock.millis());
        write(realm, report);
        return report.summary();
    }

    /**
     * Removes a report, which frees its name. Only a file that is a report file is removed, whether it can be read or
     * not, so that a damaged file can be got rid of.
     *
     * @throws ApiException 404 if the realm has no such report
     */
    synchronized void delete(String realm, String id) {
        Path file = file(realm, id);
        try {
            if (!Files.isRegularFile(file) || !Files.deleteIfExists(file)) {
                throw new ApiException(404, "report not found");
            }
        } catch (IOException e) {
            throw new UncheckedIOException("Cannot remove " + file + ": " + e, e);
        }
        LOG.info("Removed the saved report {} of the realm {}", id, realm);
    }

    private void requireFreeName(String realm, String name, String ownId) {
        String key = nameKey(name);
        for (SavedReport other : readAll(realm)) {
            if (!other.id().equals(ownId) && nameKey(other.name()).equals(key)) {
                throw new ApiException(409, "a report with this name exists already");
            }
        }
    }

    private static String nameKey(String name) {
        return name.toLowerCase(Locale.ROOT);
    }

    /** The folder of a realm. A realm name is checked, because it becomes part of a path. */
    private Path folder(String realm) {
        if (!Ids.REALM.matcher(realm).matches()) {
            throw new IllegalArgumentException("invalid realm");
        }
        return root.resolve(realm);
    }

    private Path file(String realm, String id) {
        if (!ID.matcher(id).matches()) {
            throw new IllegalArgumentException("invalid report id");
        }
        return folder(realm).resolve(id + EXTENSION);
    }

    /** The name of a file without its extension. */
    private static String stem(Path file) {
        String name = file.getFileName().toString();
        return name.substring(0, name.length() - EXTENSION.length());
    }

    /**
     * The reports in the folder of the realm. A file that is not a report is skipped, so that one cannot hide the
     * others.
     */
    private List<SavedReport> readAll(String realm) {
        Path folder = folder(realm);
        List<SavedReport> reports = new ArrayList<>();
        if (!Files.isDirectory(folder)) {
            return reports;
        }
        try (DirectoryStream<Path> files = Files.newDirectoryStream(folder, "*" + EXTENSION)) {
            for (Path file : files) {
                if (!ID.matcher(stem(file)).matches()) {
                    continue;
                }
                try {
                    reports.add(read(file));
                } catch (UncheckedIOException e) {
                    LOG.warn("Skipped a saved report that cannot be read: {}", e.getMessage());
                }
            }
        } catch (IOException e) {
            throw new UncheckedIOException("Cannot list the saved reports in " + folder, e);
        }
        return reports;
    }

    /** The report in the file, which must be one: it has a name, and the ID that its file is named after. */
    private static SavedReport read(Path file) {
        SavedReport report;
        try {
            report = Json.convert(Json.read(Files.readAllBytes(file)), SAVED_REPORT);
        } catch (IOException e) {
            throw new UncheckedIOException("Cannot read " + file + ": " + e, e);
        } catch (IllegalArgumentException e) {
            throw new UncheckedIOException("Cannot read " + file + ": " + e.getMessage(), new IOException(e));
        }
        if (report == null || report.name() == null || !stem(file).equals(report.id())) {
            throw new UncheckedIOException("Cannot read " + file + ": it is not a saved report",
                    new IOException("not a saved report"));
        }
        return report;
    }

    /** Writes the report to a file of its own and moves that over the report, which replaces it in one step. */
    private void write(String realm, SavedReport report) {
        Path folder = folder(realm);
        Path temporary = null;
        try {
            Files.createDirectories(folder);
            temporary = Files.createTempFile(folder, "report-", ".tmp");
            Files.write(temporary, Json.write(report));
            Files.move(temporary, file(realm, report.id()), StandardCopyOption.ATOMIC_MOVE);
        } catch (IOException e) {
            throw new UncheckedIOException("Cannot save the report in " + folder + ": " + e, e);
        } finally {
            removeQuietly(temporary);
        }
    }

    private static void removeQuietly(Path file) {
        if (file == null) {
            return;
        }
        try {
            Files.deleteIfExists(file);
        } catch (IOException e) {
            LOG.warn("Cannot remove {}: {}", file, e.toString());
        }
    }
}
