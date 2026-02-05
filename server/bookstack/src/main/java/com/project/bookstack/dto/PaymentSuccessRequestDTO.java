package com.project.bookstack.dto;

import lombok.Data;
import java.util.Map;

/**
 * Payment Success Request DTO
 * =========================================================================
 * Captures payment gateway response and user registration data after successful
 * payment.
 */
@Data
public class PaymentSuccessRequestDTO {

    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;

    private String purpose;
    private String membershipType;
    private String billing;

    private Map<String, Object> registerData; // forwarded from frontend
}
