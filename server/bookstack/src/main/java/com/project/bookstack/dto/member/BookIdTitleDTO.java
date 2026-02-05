package com.project.bookstack.dto.member;

/**
 * Book ID Title DTO
 * =========================================================================
 * Minimal book identification with ID and title.
 */
public record BookIdTitleDTO(
		Integer bookId,
		String title) {
}
