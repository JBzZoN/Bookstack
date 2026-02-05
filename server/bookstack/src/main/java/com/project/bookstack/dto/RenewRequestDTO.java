package com.project.bookstack.dto;

import lombok.Data;

/**
 * Renew Request DTO
 * =========================================================================
 * Used for member renewal selection requests.
 */
@Data
public class RenewRequestDTO {
	Integer memberId;
	Integer renewSelected;
}
