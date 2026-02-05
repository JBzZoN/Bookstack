package com.project.bookstack.dto.member;

import java.util.List;

/**
 * Book Described DTO
 * =========================================================================
 * Comprehensive DTO for displaying full book descriptions and inventory
 * details.
 */
public record BookDescribedDTO(
        Integer bookId,
        String isbn,
        String title,
        String author,
        String description,
        String publisher,
        Integer numberOfCopies,
        Integer numberOfCopiesRemaining,
        String bookImage) {
}
