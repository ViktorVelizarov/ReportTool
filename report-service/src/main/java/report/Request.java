package report;

import java.util.Map;

/**
 * A GET request routed by {@link Router}: the path parameters (the {@code {name}} parts of the route) and the query
 * parameters. Invalid parameters are reported to the caller as {@link ApiException} 400.
 */
final class Request {

    private final Map<String, String> pathParams;
    private final Map<String, String> queryParams;

    Request(Map<String, String> pathParams, Map<String, String> queryParams) {
        this.pathParams = pathParams;
        this.queryParams = queryParams;
    }

    String path(String name) {
        return pathParams.get(name);
    }

    /** The query parameter, or null if it is absent or empty. */
    String query(String name) {
        String value = queryParams.get(name);
        return value == null || value.isEmpty() ? null : value;
    }

    /** An integer query parameter between {@code min} and {@code max} (inclusive), or {@code fallback} if absent. */
    int intQuery(String name, int fallback, int min, int max) {
        String value = query(name);
        if (value == null) {
            return fallback;
        }
        String message = name + " must be an integer between " + min + " and " + max;
        try {
            int parsed = Integer.parseInt(value);
            if (parsed < min || parsed > max) {
                throw new ApiException(400, message);
            }
            return parsed;
        } catch (NumberFormatException e) {
            throw new ApiException(400, message);
        }
    }
}
