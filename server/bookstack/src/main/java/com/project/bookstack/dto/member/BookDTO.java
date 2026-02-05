package com.project.bookstack.dto.member;

import java.util.List;

/**
 * Book DTO (Member)
 * =========================================================================
 * Comprehensive composite DTO for book details as seen by members.
 * Includes catalog metadata, availability, user-specific "like" status, and
 * ratings.
 */
public record BookDTO(
        Integer bookId,
        String isbn,
        String title,
        String author,
        String description,
        List<String> genres,
        String publisher,
        Integer numberOfCopies,
        Integer numberOfCopiesRemaining,
        Double averageRatings,
        Boolean likedByCurrentUser,
        String bookImage) {
}
