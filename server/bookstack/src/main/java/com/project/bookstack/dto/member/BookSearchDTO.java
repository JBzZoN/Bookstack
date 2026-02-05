package com.project.bookstack.dto.member;

/**
 * Book Search DTO
 * =========================================================================
 * Minimal DTO for search autocomplete and quick lookups.
 */
public record BookSearchDTO(
		Integer bookId,
		String title,
		String author) {
}
