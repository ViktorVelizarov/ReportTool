package com.example.reportservice.web;

/** An error to report to the caller of an endpoint, as an HTTP status with a JSON message. */
@SuppressWarnings("serial")
public final class ApiException extends RuntimeException {

    private final int status;

    public ApiException(int status, String message) {
        super(message);
        this.status = status;
    }

    public int status() {
        return status;
    }
}
