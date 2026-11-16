package com.example.reportservice.config;

import java.net.URI;
import java.time.Duration;
import java.util.function.UnaryOperator;

/**
 * The model that writes the text of a report: an API that is compatible with OpenAI's, hosted or local.
 *
 * @param baseUrl the address of the API without a slash at its end, such as {@code https://api.anthropic.com/v1}
 * @param model   the name of the model as the API knows it
 * @param apiKey  the key of the API, or null for an API that needs none, as a local one
 * @param timeout how long the service waits for the model
 */
public record AiSettings(String baseUrl, String model, String apiKey, Duration timeout) {

    private static final Duration DEFAULT_TIMEOUT = Duration.ofSeconds(30);

    /**
     * The settings of the model, or null when AI text is not set up, which is when neither {@code AI_BASE_URL} nor
     * {@code AI_MODEL} is there. A setting that is blank counts as one that is not there.
     *
     * @throws IllegalArgumentException if only one of the two is there, or a setting is invalid
     */
    static AiSettings from(UnaryOperator<String> env) {
        String baseUrl = setting(env, "AI_BASE_URL");
        String model = setting(env, "AI_MODEL");
        if (baseUrl == null && model == null) {
            return null;
        }
        if (baseUrl == null || model == null) {
            throw new IllegalArgumentException("AI text needs both AI_BASE_URL and AI_MODEL: "
                    + (baseUrl == null ? "AI_BASE_URL" : "AI_MODEL") + " is missing (set it, or remove the other)");
        }
        return new AiSettings(
                baseUrl(baseUrl), model, setting(env, "AI_API_KEY"), timeout(setting(env, "AI_TIMEOUT_SECONDS")));
    }

    /** The host of the API, which is what an author is told about where the figures of a report are sent. */
    public String host() {
        return URI.create(baseUrl).getHost();
    }

    private static String setting(UnaryOperator<String> env, String name) {
        String value = env.apply(name);
        return value == null || value.isBlank() ? null : value.strip();
    }

    /** The address without the slashes at its end, so that a path can be added to it. */
    private static String baseUrl(String value) {
        String url = value.replaceAll("/+$", "");
        if (!isWebAddress(url)) {
            // the value is left out: a key that was put in the wrong setting would end up in the log
            throw new IllegalArgumentException("AI_BASE_URL must be an http or https address without a query, "
                    + "such as https://api.anthropic.com/v1");
        }
        return url;
    }

    private static boolean isWebAddress(String url) {
        URI uri;
        try {
            uri = URI.create(url);
        } catch (IllegalArgumentException e) {
            return false;
        }
        boolean web = "http".equalsIgnoreCase(uri.getScheme()) || "https".equalsIgnoreCase(uri.getScheme());
        return web && uri.getHost() != null && uri.getQuery() == null && uri.getFragment() == null;
    }

    private static Duration timeout(String value) {
        if (value == null) {
            return DEFAULT_TIMEOUT;
        }
        try {
            int seconds = Integer.parseInt(value);
            if (seconds >= 1) {
                return Duration.ofSeconds(seconds);
            }
        } catch (NumberFormatException e) {
            // reported below, as a number that is too low is
        }
        throw new IllegalArgumentException("AI_TIMEOUT_SECONDS must be a whole number of seconds, 1 or more");
    }

    /** Keeps the key out of logs. */
    @Override
    public String toString() {
        return "AiSettings[baseUrl=" + baseUrl + ", model=" + model + ", timeout=" + timeout + "]";
    }
}
