package com.example.reportservice.web;

/**
 * An answer without a body, for a {@link Router.Handler} to return: the response is {@code 204 No Content}, as for a
 * saved report that was removed.
 */
public record NoContent() { }
