package com.example.reportservice.report;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * A saved report, as it is kept in its file and given to the web interface. The service does not look into the
 * template, the instructions or the schedule: they are what the interface made of them.
 *
 * @param id           the ID that the store gave the report when it was first saved
 * @param name         the name the report is saved under, which no other report of its realm has
 * @param periodId     the time frame of the report, which is relative (such as the last 30 days) and so is not a date
 * @param template     the layout and the widgets, a {@code DashboardTemplate} of OpenRemote's Insights
 * @param instructions what the author told the AI about the report; null if the interface sent none
 * @param schedule     when the report is made by itself; null if it has no schedule
 * @param createdAt    when the report was first saved, Unix milliseconds
 * @param updatedAt    when the report was last saved, Unix milliseconds
 */
record SavedReport(
        String id,
        String name,
        String periodId,
        JsonNode template,
        JsonNode instructions,
        JsonNode schedule,
        long createdAt,
        long updatedAt) {

    ReportSummary summary() {
        return new ReportSummary(id, name, updatedAt);
    }
}
