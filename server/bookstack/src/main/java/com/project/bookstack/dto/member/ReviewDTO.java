package com.project.bookstack.dto.member;

import java.time.LocalDateTime;

/**
 * Review DTO
 * =========================================================================
 * Represents a user's review (rating + comment) for a book.
 */
public record ReviewDTO(
                Integer userId,
                Integer rating,
                String comment,
                LocalDateTime createdAt) {
}
