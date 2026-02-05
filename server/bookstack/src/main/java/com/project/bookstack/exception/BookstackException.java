package com.project.bookstack.exception;

/**
 * Bookstack Exception
 * =========================================================================
 * Base exception class for all custom application exceptions.
 * Provides a common parent for domain-specific exceptions.
 */
public class BookstackException extends RuntimeException {

    public BookstackException(String message) {
        super(message);
    }

    public BookstackException(String message, Throwable cause) {
        super(message, cause);
    }
}
