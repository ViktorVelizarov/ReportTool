package com.example.reportservice.web;

import com.example.reportservice.json.Json;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * A request routed by {@link Router}: the path parameters (the {@code {name}} parts of the route), the query parameters
 * and the body. Invalid parameters are reported to the caller as {@link ApiException} 400.
 */
public final class Request {

    private static final Pattern NON_NEGATIVE_INT = Pattern.compile("\\d{1,9}");

    private final Map<String, String> pathParams;
    private final Map<String, String> queryParams;
    private final byte[] body;

    Request(Map<String, String> pathParams, Map<String, String> queryParams, byte[] body) {
        this.pathParams = pathParams;
        this.queryParams = queryParams;
        this.body = body;
    }

    public String path(String name) {
        return pathParams.get(name);
    }

    /** A path parameter that must match {@code pattern}; otherwise the request is rejected as invalid {@code what}. */
    public String path(String name, Pattern pattern, String what) {
        return require(pattern, path(name), what);
    }

    /** The query parameter, or null if it is absent or empty. */
    public String query(String name) {
        String value = queryParams.get(name);
        return value == null || value.isEmpty() ? null : value;
    }

    /** Like {@link #query(String)}, but the parameter must match {@code pattern} if it is there. */
    public String query(String name, Pattern pattern, String what) {
        String value = query(name);
        return value == null ? null : require(pattern, value, what);
    }

    /** Like {@link #query(String, Pattern, String)}, but {@code fallback} if the parameter is absent. */
    public String query(String name, Pattern pattern, String what, String fallback) {
        String value = query(name, pattern, what);
        return value == null ? fallback : value;
    }

    public String requiredQuery(String name) {
        String value = query(name);
        if (value == null) {
            throw new ApiException(400, name + " is required");
        }
        return value;
    }

    /** A non-negative integer query parameter, or 0 if it is absent. */
    public int nonNegativeIntQuery(String name) {
        String value = query(name);
        if (value == null) {
            return 0;
        }
        if (!NON_NEGATIVE_INT.matcher(value).matches()) {
            throw new ApiException(400, name + " must be a non-negative integer");
        }
        return Integer.parseInt(value);
    }

    /** The body, which must be a JSON object. */
    public JsonNode jsonBody() {
        JsonNode json;
        try {
            json = Json.read(body);
        } catch (IOException e) {
            throw new ApiException(400, "the body is not valid JSON");
        }
        if (!json.isObject()) {
            throw new ApiException(400, "the body must be a JSON object");
        }
        return json;
    }

    /** Returns {@code value} if it matches {@code pattern}; otherwise rejects the request as invalid {@code what}. */
    public static String require(Pattern pattern, String value, String what) {
        if (!pattern.matcher(value).matches()) {
            throw new ApiException(400, "invalid " + what);
        }
        return value;
    }
}
