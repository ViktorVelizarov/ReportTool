package report;

import java.util.Map;
import java.util.regex.Pattern;

/**
 * A GET request routed by {@link Router}: the path parameters (the {@code {name}} parts of the route) and the query
 * parameters. Invalid parameters are reported to the caller as {@link ApiException} 400.
 */
final class Request {

    private static final Pattern NON_NEGATIVE_INT = Pattern.compile("\\d{1,9}");

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

    String requiredQuery(String name) {
        String value = query(name);
        if (value == null) {
            throw new ApiException(400, name + " is required");
        }
        return value;
    }

    /** A non-negative integer query parameter, or 0 if it is absent. */
    int nonNegativeIntQuery(String name) {
        String value = query(name);
        if (value == null) {
            return 0;
        }
        if (!NON_NEGATIVE_INT.matcher(value).matches()) {
            throw new ApiException(400, name + " must be a non-negative integer");
        }
        return Integer.parseInt(value);
    }
}
