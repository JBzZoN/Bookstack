package com.project.bookstack.dto.member;

import java.time.LocalDate;

/**
 * Book ID Start Due Dates DTO
 * =========================================================================
 * Tracks rental period with start and due dates by book ID.
 */
public record BookIdStartDueDatesDTO(
		Integer bookId,
		LocalDate startDate,
		LocalDate endDate) {
}
