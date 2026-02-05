package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Book Copy Count DTO
 * =========================================================================
 * Used for updating book inventory counts.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookCopyCountDto {
	Integer bookId;
	Integer noOfCopiesRemaining;
}
