package com.example.reportservice.report;

/**
 * A saved report as the list of saved reports shows it.
 *
 * @param id        the ID that the store gave the report when it was first saved
 * @param name      the name the report is saved under
 * @param updatedAt when the report was last saved, Unix milliseconds
 */
record ReportSummary(String id, String name, long updatedAt) { }
