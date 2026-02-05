package com.project.bookstack.dto;

import java.util.List;

import lombok.Data;

/**
 * Rent/Renew/Return Request DTO
 * =========================================================================
 * Wraps multiple book transactions for a single member-staff interaction.
 */
@Data
public class RentRenewReturnRequestDTO {

    private Integer staffId;

    private Integer memberId;

    private List<RentRenewReturnRecordDTO> records;
}