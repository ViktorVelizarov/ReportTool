package report;

/** An error to report to the caller of an endpoint, as an HTTP status with a JSON message. */
@SuppressWarnings("serial")
final class ApiException extends RuntimeException {

    final int status;

    ApiException(int status, String message) {
        super(message);
        this.status = status;
    }
}
