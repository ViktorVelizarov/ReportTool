package com.example.reportservice.export;

import com.fasterxml.jackson.databind.JsonNode;

/** Makes the PDF of a report. */
@FunctionalInterface
public interface PdfRenderer {

    /**
     * @param realm  the realm whose data the report shows, or null for the realm of the service user
     * @param width  the width in pixels that the report is laid out in, which is the width that it has in Preview
     * @param report the report as the web interface posts it (see {@code model/exports.js} in the frontend)
     * @return the PDF
     * @throws com.example.reportservice.web.ApiException 502 when the PDF could not be made, 503 when there is nothing
     *                                                    to make it with or too many are being made
     */
    byte[] render(String realm, int width, JsonNode report) throws InterruptedException;
}
