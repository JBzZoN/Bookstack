package com.project.bookstack.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private String purpose;          // BUY_MEMBERSHIP
    private String membershipType;   // Basic / Premium / Standard
    private String billing;          // monthly / yearly
}
