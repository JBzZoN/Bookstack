package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Email DTO
 * =========================================================================
 * Used for sending email notifications via Kafka messaging.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDTO {
	String email;
	String emailId;
}
