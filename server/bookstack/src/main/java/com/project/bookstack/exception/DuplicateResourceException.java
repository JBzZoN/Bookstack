package com.project.bookstack.exception;

/**
 * Duplicate Resource Exception
 * =========================================================================
 * Thrown when attempting to create a resource that already exists.
 * Maps to HTTP 409 Conflict.
 */
public class DuplicateResourceException extends BookstackException {

    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String resourceType, String identifier) {
        super(String.format("%s already exists: %s", resourceType, identifier));
    }
}
