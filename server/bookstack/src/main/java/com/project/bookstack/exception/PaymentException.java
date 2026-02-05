package com.project.bookstack.exception;

/**
 * Payment Exception
 * =========================================================================
 * Thrown when payment processing or validation fails.
 * Maps to HTTP 402 Payment Required.
 */
public class PaymentException extends BookstackException {

    public PaymentException(String message) {
        super(message);
    }

    public PaymentException(String message, Throwable cause) {
        super(message, cause);
    }
}
