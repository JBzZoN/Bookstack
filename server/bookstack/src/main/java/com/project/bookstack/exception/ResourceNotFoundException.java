package com.project.bookstack.exception;

/**
 * Resource Not Found Exception
 * =========================================================================
 * Thrown when a requested resource (book, user, etc.) cannot be found.
 * Maps to HTTP 404 Not Found.
 */
public class ResourceNotFoundException extends BookstackException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceType, Object identifier) {
        super(String.format("%s not found with identifier: %s", resourceType, identifier));
    }
}
