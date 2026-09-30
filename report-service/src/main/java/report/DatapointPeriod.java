package report;

/**
 * The time span for which an attribute has stored data points.
 *
 * @param assetId         asset ID
 * @param attributeName   attribute name
 * @param oldestTimestamp Unix milliseconds of the oldest stored data point; null if there are none
 * @param latestTimestamp Unix milliseconds of the newest stored data point; null if there are none
 */
record DatapointPeriod(String assetId, String attributeName, Long oldestTimestamp, Long latestTimestamp) { }
