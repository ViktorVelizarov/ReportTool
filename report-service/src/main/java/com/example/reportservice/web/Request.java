package com.example.reportservice.web;

import java.util.Map;
import java.util.regex.Pattern;

/**
 * A GET request routed by {@link Router}: the path parameters (the {@code {name}} parts of the route) and the query
 * parameters. Invalid parameters are reported to the caller as {@link ApiException} 400.
 */
public final class Request {

    private static final Pattern NON_NEGATIVE_INT = Pattern.compile("\\d{1,9}");

    private final Map<String, String> pathParams;
    private final Map<String, String> queryParams;

    Request(Map<String, String> pathParams, Map<String, String> queryParams) {
        this.pathParams = pathParams;
        this.queryParams = queryParams;
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

    /** Returns {@code value} if it matches {@code pattern}; otherwise rejects the request as invalid {@code what}. */
    public static String require(Pattern pattern, String value, String what) {
        if (!pattern.matcher(value).matches()) {
            throw new ApiException(400, "invalid " + what);
        }
        return value;
    }
}
