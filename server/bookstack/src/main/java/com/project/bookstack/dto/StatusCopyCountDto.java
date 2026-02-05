package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Status Copy Count DTO
 * =========================================================================
 * Tracks book copy counts by transaction status (Rent/Renew/Return).
 */
@Data
@AllArgsConstructor
public class StatusCopyCountDto {
	String status;
	Integer CopyCount;
}
