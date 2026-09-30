package report;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;

/**
 * An attribute of an asset.
 *
 * @param name      attribute name, unique within the asset
 * @param type      name of the value descriptor that types the value, e.g. {@code number} or {@code text}
 * @param value     the current value, whose JSON shape depends on the type; null if it has none
 * @param timestamp when the value was last set, Unix milliseconds
 * @param meta      meta items by name, e.g. {@code units} or {@code storeDataPoints}; each has its own JSON shape
 */
record Attribute(String name, String type, JsonNode value, Long timestamp, Map<String, JsonNode> meta) { }
