package com.project.bookstack.dto.member;

import java.time.LocalDate;

/**
 * Book ID Return Date DTO
 * =========================================================================
 * Tracks book return dates by book ID.
 */
public record BookIdReturnDateDTO(
        Integer bookId,
        LocalDate returnDate) {
}
