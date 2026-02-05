package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Book Member DTO
 * =========================================================================
 * Associates a book with a member and tracks copy count.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookMemberDto {
	Integer bookId;
	Integer memberId;
	Integer copyCount;
}
