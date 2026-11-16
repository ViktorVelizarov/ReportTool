package com.example.reportservice.ai;

import com.example.reportservice.json.Json;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * The text that the model wrote for a report, in its four kinds.
 *
 * @param introduction what the report is about
 * @param findings     what stands out in the figures
 * @param descriptions a description of each widget, in the order of the widgets
 * @param conclusion   what follows from the findings
 */
record TextAnswer(String introduction, String findings, List<String> descriptions, String conclusion) {

    private static final Set<String> FIELDS = Set.of("introduction", "findings", "descriptions", "conclusion");

    /**
     * Reads the answer of the model, which must be a JSON object with exactly the four kinds of text, none of them
     * blank, and as many descriptions as were asked for: a schema cannot fix the length of a list, and not every model
     * keeps to a schema.
     *
     * @param content      what the model answered
     * @param descriptions how many descriptions were asked for
     * @throws IllegalArgumentException if the answer is not that; the message says what is wrong, without the text
     */
    static TextAnswer parse(String content, int descriptions) {
        JsonNode json;
        try {
            json = Json.read(content.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            throw new IllegalArgumentException("it is not JSON");
        }
        if (!json.isObject()) {
            throw new IllegalArgumentException("it is not a JSON object");
        }
        if (json.size() != FIELDS.size() || !FIELDS.stream().allMatch(json::has)) {
            throw new IllegalArgumentException(
                    "it does not have exactly the introduction, findings, descriptions and conclusion");
        }
        JsonNode list = json.get("descriptions");
        if (!list.isArray() || list.size() != descriptions) {
            throw new IllegalArgumentException("it has " + (list.isArray() ? list.size() : "no list of")
                    + " descriptions, and " + descriptions + " were asked for");
        }
        List<String> texts = new ArrayList<>();
        for (JsonNode description : list) {
            texts.add(text(description, "a description"));
        }
        return new TextAnswer(text(json.get("introduction"), "the introduction"),
                text(json.get("findings"), "the findings"), List.copyOf(texts),
                text(json.get("conclusion"), "the conclusion"));
    }

    private static String text(JsonNode node, String what) {
        if (!node.isTextual() || node.asText().isBlank()) {
            throw new IllegalArgumentException("it has no text for " + what);
        }
        return node.asText().strip();
    }
}
