package com.project.bookstack.dto.member;

import java.time.LocalDate;

/**
 * Currently Borrowed Books DTO
 * =========================================================================
 * Summarizes an active rental for a member.
 * Tracks the book title and the borrow/due dates.
 */
public record CurrentlyBorrowedBooksDTO(
		String title,
		LocalDate startDate,
		LocalDate endDate) {
}
