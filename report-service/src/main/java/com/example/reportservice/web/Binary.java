package com.example.reportservice.web;

/**
 * A response body that is not JSON, such as a PDF, for a {@link Router.Handler} to return.
 *
 * @param contentType the media type of the bytes
 */
public record Binary(String contentType, byte[] bytes) { }
