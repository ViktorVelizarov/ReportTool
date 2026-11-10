package com.example.reportservice.report;

import com.example.reportservice.web.ApiException;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * What the web interface sends to save a report: its setup. The service checks that it is made like a report, so that
 * the interface can open it again, and keeps the parts that it does not look into as they are.
 *
 * @param name         the name to save the report under, without the spaces around it
 * @param periodId     the time frame of the report
 * @param template     the layout and the widgets
 * @param instructions what the author told the AI about the report; null if none were sent
 * @param schedule     when the report is made by itself; null if it has none
 */
record ReportDraft(String name, String periodId, JsonNode template, JsonNode instructions, JsonNode schedule) {

    /** The longest name of a report; the field for the name in the web interface has the same limit. */
    static final int MAX_NAME_LENGTH = 80;

    private static final int MAX_PERIOD_ID_LENGTH = 100;

    /**
     * The report in the body of a request. Properties that are not part of a report, such as an ID or a time of saving,
     * are left out: the store decides those.
     *
     * @throws ApiException 400 if the body is not a report
     */
    static ReportDraft of(JsonNode body) {
        return new ReportDraft(
                name(body.get("name")),
                periodId(body.get("periodId")),
                template(body.get("template")),
                objectOrNull(body.get("instructions"), "instructions"),
                objectOrNull(body.get("schedule"), "schedule"));
    }

    private static String name(JsonNode node) {
        String name = node != null && node.isTextual() ? node.asText().strip() : "";
        if (name.isEmpty() || name.length() > MAX_NAME_LENGTH || name.chars().anyMatch(Character::isISOControl)) {
            throw new ApiException(400, "invalid name");
        }
        return name;
    }

    private static String periodId(JsonNode node) {
        if (node == null || !node.isTextual() || node.asText().isBlank()
                || node.asText().length() > MAX_PERIOD_ID_LENGTH) {
            throw new ApiException(400, "invalid periodId");
        }
        return node.asText();
    }

    /** A template has a list of widgets, which may be empty. */
    private static JsonNode template(JsonNode node) {
        if (node == null || !node.isObject() || !node.path("widgets").isArray()) {
            throw new ApiException(400, "invalid template");
        }
        return node;
    }

    private static JsonNode objectOrNull(JsonNode node, String what) {
        if (node == null || node.isNull()) {
            return null;
        }
        if (!node.isObject()) {
            throw new ApiException(400, "invalid " + what);
        }
        return node;
    }
}
