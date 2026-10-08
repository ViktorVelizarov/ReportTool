package com.example.reportservice.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;

/** Reads and writes JSON with one shared, configured Jackson mapper. Unknown properties are ignored when reading. */
public final class Json {

    private static final ObjectMapper MAPPER =
            new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    private Json() { }

    /** A new, empty JSON object. */
    public static ObjectNode object() {
        return MAPPER.createObjectNode();
    }

    public static byte[] write(Object value) throws JsonProcessingException {
        return MAPPER.writeValueAsBytes(value);
    }

    public static JsonNode read(byte[] json) throws IOException {
        return MAPPER.readTree(json);
    }

    /** @throws IllegalArgumentException if the JSON does not have the structure of the type */
    public static <T> T convert(JsonNode json, TypeReference<T> type) {
        return MAPPER.convertValue(json, type);
    }
}
