package com.project.bookstack.dto;

import lombok.Data;

/**
 * Rent Request DTO
 * =========================================================================
 * Used for member rent selection requests.
 */
@Data
public class RentRequestDTO {
	Integer memberId;
	Integer rentSelected;
}
