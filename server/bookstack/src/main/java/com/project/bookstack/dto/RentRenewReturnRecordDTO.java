package com.project.bookstack.dto;

import lombok.Data;

/**
 * Rent/Renew/Return Record DTO
 * =========================================================================
 * Represents a single book transaction within a circulation record.
 */
@Data
public class RentRenewReturnRecordDTO {

    private String status; // Rent | Renew | Return

    private Integer bookId;

    private Integer copies;
}