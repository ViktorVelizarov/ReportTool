package report;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/** A non-2xx response from Keycloak or the manager. */
@SuppressWarnings("serial")
final class HttpStatusException extends IOException {

    final int status;

    HttpStatusException(int status, byte[] body) {
        super("HTTP " + status + " '" + preview(body) + "'");
        this.status = status;
    }

    private static String preview(byte[] body) {
        String text = new String(body, StandardCharsets.UTF_8);
        return text.length() > 200 ? text.substring(0, 200) : text;
    }
}
