package com.project.bookstack.dto.member;

/**
 * Book Core DTO
 * =========================================================================
 * Minimalist DTO containing only essential book identification and visuals.
 */
public record BookCoreDTO(
        Integer bookId,
        String title,
        String author,
        String bookImage) {
}
