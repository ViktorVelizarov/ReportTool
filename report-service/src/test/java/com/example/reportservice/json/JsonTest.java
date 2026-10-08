package com.example.reportservice.json;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.junit.jupiter.api.Test;

class JsonTest {

    record Sample(String name, int size) { }

    @Test
    void readsAndWritesJson() throws Exception {
        JsonNode read = Json.read("{\"a\":1}".getBytes(StandardCharsets.UTF_8));
        assertEquals(1, read.get("a").asInt());

        byte[] written = Json.write(Json.object().put("x", true));
        assertEquals("{\"x\":true}", new String(written, StandardCharsets.UTF_8));
    }

    @Test
    void ignoresUnknownPropertiesWhenConverting() {
        JsonNode json = Json.object().put("name", "a").put("size", 2).put("other", true);

        assertEquals(new Sample("a", 2), Json.convert(json, new TypeReference<Sample>() { }));
    }

    @Test
    void rejectsJsonOfTheWrongStructure() {
        assertThrows(IllegalArgumentException.class,
                () -> Json.convert(Json.object(), new TypeReference<List<String>>() { }));
    }
}
