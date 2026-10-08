package com.example.reportservice.openremote;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/** A non-2xx response from Keycloak or the manager. */
@SuppressWarnings("serial")
public final class HttpStatusException extends IOException {

    private final int status;

    HttpStatusException(int status, byte[] body) {
        super("HTTP " + status + " '" + preview(body) + "'");
        this.status = status;
    }

    public int status() {
        return status;
    }

    private static String preview(byte[] body) {
        String text = new String(body, StandardCharsets.UTF_8);
        return text.length() > 200 ? text.substring(0, 200) : text;
    }
}
