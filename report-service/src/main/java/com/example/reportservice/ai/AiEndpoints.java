package com.example.reportservice.ai;

import com.example.reportservice.config.AiSettings;
import com.example.reportservice.web.ApiException;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.InstantSource;

/**
 * The AI text endpoints: {@code GET /ai/status} and {@code POST /ai/text}. The paths have two parts, so that a realm
 * that is called {@code ai} can still be opened as {@code /ai}.
 */
public final class AiEndpoints {

    /** The longest prompt, in characters (some 15,000 tokens): the figures of a large report are far below it. */
    static final int MAX_PROMPT_CHARS = 60_000;

    /** The most widget descriptions that can be asked for: no report has that many widgets. */
    static final int MAX_DESCRIPTIONS = 100;

    static final int MAX_CALLS_AT_A_TIME = 2;
    static final int MAX_CALLS_PER_MINUTE = 10;

    private final AiStatus status;
    private final ChatClient model;
    private final CallLimits limits;

    /**
     * @param settings the settings of the model that writes the text, or null when AI text is not set up
     * @param clock    the time, for the limit on the calls in a minute
     */
    public AiEndpoints(AiSettings settings, InstantSource clock) {
        this.status = AiStatus.of(settings);
        this.model = settings == null ? null : new ChatClient(settings);
        this.limits = new CallLimits(MAX_CALLS_AT_A_TIME, MAX_CALLS_PER_MINUTE, clock);
    }

    public void register(Router router) {
        router.get("/ai/status", request -> status);
        router.post("/ai/text", this::writeText);
    }

    /**
     * {@code POST /ai/text}: the text that the model writes for the prompt in the body, a JSON object with the rules
     * for the model as {@code system}, the report with its figures and the task as {@code user}, and the number of
     * widget descriptions that the answer must have as {@code descriptions}. The web interface makes the prompt; the
     * service adds the key, makes the call and checks the shape of the answer.
     */
    private Object writeText(Request request) throws InterruptedException {
        if (model == null) {
            throw new ApiException(503, "AI text is not set up");
        }
        JsonNode body = request.jsonBody();
        String system = text(body, "system");
        String user = text(body, "user");
        int descriptions = descriptions(body.get("descriptions"));
        if (system.length() + user.length() > MAX_PROMPT_CHARS) {
            throw new ApiException(413, "the report has too many figures for the AI");
        }
        if (!limits.tryEnter()) {
            throw new ApiException(429, "the AI is busy: try again in a moment");
        }
        try {
            return model.write(system, user, descriptions);
        } finally {
            limits.leave();
        }
    }

    private static String text(JsonNode body, String name) {
        JsonNode value = body.get(name);
        if (value == null || !value.isTextual() || value.asText().isBlank()) {
            throw new ApiException(400, "invalid " + name);
        }
        return value.asText();
    }

    private static int descriptions(JsonNode value) {
        if (value == null || !value.isIntegralNumber() || !value.canConvertToInt() || value.asInt() < 0
                || value.asInt() > MAX_DESCRIPTIONS) {
            throw new ApiException(400, "invalid descriptions");
        }
        return value.asInt();
    }
}
