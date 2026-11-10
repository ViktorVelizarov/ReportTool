package com.example.reportservice.report;

import com.example.reportservice.openremote.Ids;
import com.example.reportservice.web.ApiException;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import java.io.IOException;
import java.nio.file.Path;
import java.time.Clock;

/**
 * The endpoints of the saved reports: {@code GET /reports}, {@code POST /reports}, {@code GET /reports/{id}} and
 * {@code PUT /reports/{id}}. They work on the reports of the realm of the {@code realm} query parameter, or of the
 * realm of the service user if there is none, and keep them in a {@link ReportStore}.
 */
public final class ReportEndpoints {

    private final ReportStore store;
    private final String defaultRealm;

    /**
     * @param folder       where the reports are kept; it is made if it is not there
     * @param clock        the time that a report is saved at
     * @param defaultRealm the realm of the reports when a request names none
     * @throws IOException if the folder cannot be made
     */
    public ReportEndpoints(Path folder, Clock clock, String defaultRealm) throws IOException {
        this.store = new ReportStore(folder, clock);
        this.defaultRealm = defaultRealm;
    }

    public void register(Router router) {
        router.get("/reports", this::list);
        router.post("/reports", this::create);
        router.get("/reports/{id}", this::open);
        router.put("/reports/{id}", this::replace);
    }

    /** {@code GET /reports?realm=}: the saved reports of the realm by name, each as {@code {id, name, updatedAt}}. */
    private Object list(Request request) {
        return store.list(realm(request));
    }

    /**
     * {@code POST /reports?realm=}: saves the report in the body as a new report. The body has the {@code name},
     * {@code periodId} and {@code template} of the report, and its {@code instructions} and {@code schedule} if it has
     * any. The answer is the {@code {id, name, updatedAt}} of the report; a name that another report of the realm has
     * is a 409.
     */
    private Object create(Request request) {
        return store.create(realm(request), ReportDraft.of(request.jsonBody()));
    }

    /** {@code GET /reports/{id}?realm=}: the saved report with everything that was saved of it. */
    private Object open(Request request) {
        return store.find(realm(request), id(request)).orElseThrow(() -> new ApiException(404, "report not found"));
    }

    /**
     * {@code PUT /reports/{id}?realm=}: saves the report in the body over the saved report with the ID, under the name
     * the body gives it. Answers like {@code POST /reports}; an ID that the realm does not have is a 404.
     */
    private Object replace(Request request) {
        return store.update(realm(request), id(request), ReportDraft.of(request.jsonBody()));
    }

    private String realm(Request request) {
        return request.query("realm", Ids.REALM, "realm", defaultRealm);
    }

    private static String id(Request request) {
        return request.path("id", ReportStore.ID, "report id");
    }
}
