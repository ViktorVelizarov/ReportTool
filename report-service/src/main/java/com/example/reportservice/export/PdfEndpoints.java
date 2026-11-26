package com.example.reportservice.export;

import com.example.reportservice.openremote.Ids;
import com.example.reportservice.web.ApiException;
import com.example.reportservice.web.Binary;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;

/** The export endpoint: {@code POST /export/pdf}. */
public final class PdfEndpoints {

    /** The width of the layout of a report that does not say which width it has in Preview. */
    static final int DEFAULT_WIDTH = 1280;

    /**
     * The widths that a report can be laid out in. A page is printed at most at twice its size, and a window wider
     * than 4000 pixels is not one that a report is made in.
     */
    static final int MIN_WIDTH = 524;
    static final int MAX_WIDTH = 4000;

    /** Stands in for the renderer when there is no browser to make PDFs with. */
    public static final PdfRenderer UNAVAILABLE = (realm, width, report) -> {
        throw new ApiException(503, "PDF export needs Chrome, Chromium or Edge: install one, or set CHROME_PATH");
    };

    private final PdfRenderer renderer;

    public PdfEndpoints(PdfRenderer renderer) {
        this.renderer = renderer;
    }

    public void register(Router router) {
        router.post("/export/pdf", this::exportPdf);
    }

    /**
     * {@code POST /export/pdf}: the PDF of the report in the body, a JSON object that has the realm that the report is
     * about as {@code realm}, if it names one, and the width that the report has in Preview as {@code width}, a whole
     * number of pixels from 524 to 4000 (1280 when it is left out). The rest of the report is passed to the page that
     * is printed, which checks it.
     */
    private Object exportPdf(Request request) throws InterruptedException {
        JsonNode report = request.jsonBody();
        JsonNode realm = report.get("realm");
        String realmName = realm == null || realm.isNull() ? null : Request.require(Ids.REALM, realm.asText(), "realm");
        return new Binary("application/pdf", renderer.render(realmName, widthOf(report.get("width")), report));
    }

    private static int widthOf(JsonNode width) {
        if (width == null || width.isNull()) {
            return DEFAULT_WIDTH;
        }
        if (!width.isIntegralNumber() || !width.canConvertToInt() || width.asInt() < MIN_WIDTH
                || width.asInt() > MAX_WIDTH) {
            throw new ApiException(400, "invalid width");
        }
        return width.asInt();
    }
}
