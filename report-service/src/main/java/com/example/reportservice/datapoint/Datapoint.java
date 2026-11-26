package com.example.reportservice.datapoint;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * A value that was stored for an attribute at a point in time.
 *
 * @param timestamp Unix milliseconds
 * @param value     the value, whose JSON shape depends on the attribute type
 */
record Datapoint(long timestamp, JsonNode value) { }
