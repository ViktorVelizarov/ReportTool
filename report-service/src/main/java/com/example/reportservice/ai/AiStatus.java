package com.example.reportservice.ai;

import com.example.reportservice.config.AiSettings;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Whether the service can have the text of a report written, and by which model. The address of the API is not in
 * it, only its host, and the key never is.
 *
 * @param available      whether AI text is set up; the rest is left out of the JSON when it is not
 * @param model          the name of the model
 * @param host           the host of the API that the figures of a report are sent to
 * @param timeoutSeconds how long the service waits for the model
 */
record AiStatus(
        boolean available,
        @JsonInclude(JsonInclude.Include.NON_NULL) String model,
        @JsonInclude(JsonInclude.Include.NON_NULL) String host,
        @JsonInclude(JsonInclude.Include.NON_NULL) Long timeoutSeconds) {

    /** @param settings the settings of the model, or null when AI text is not set up */
    static AiStatus of(AiSettings settings) {
        return settings == null
                ? new AiStatus(false, null, null, null)
                : new AiStatus(true, settings.model(), settings.host(), settings.timeout().toSeconds());
    }
}
