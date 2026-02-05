package com.project.bookstack.dto.member;

/**
 * Book Card DTO
 * =========================================================================
 * Light-weight DTO for displaying book cards in lists (Home, Search Results).
 */
public record BookCardDTO(
		Integer bookId,
		String title,
		String author,
		String bookImage,
		Double averageRatings,
		Boolean likedByCurrentUser) {
}
