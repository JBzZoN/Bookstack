package com.project.bookstack.dto;

import lombok.Data;

/**
 * Payment Request DTO
 * =========================================================================
 * Initiates a payment session for membership purchases.
 */
@Data
public class PaymentRequestDTO {
    private String purpose; // BUY_MEMBERSHIP
    private String membershipType; // Basic / Premium / Standard
    private String billing; // monthly / yearly
}
