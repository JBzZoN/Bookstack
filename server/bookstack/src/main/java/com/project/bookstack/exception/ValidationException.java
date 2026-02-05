package com.project.bookstack.exception;

/**
 * Validation Exception
 * =========================================================================
 * Thrown when business logic validation fails.
 * Maps to HTTP 400 Bad Request.
 */
public class ValidationException extends BookstackException {

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(String field, String reason) {
        super(String.format("Validation failed for %s: %s", field, reason));
    }
}
