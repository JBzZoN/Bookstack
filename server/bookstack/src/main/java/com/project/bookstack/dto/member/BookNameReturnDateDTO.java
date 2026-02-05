package com.project.bookstack.dto.member;

import java.time.LocalDate;

/**
 * Book Name Return Date DTO
 * =========================================================================
 * Tracks book return dates by book name.
 */
public record BookNameReturnDateDTO(
        String bookName,
        LocalDate returnDate) {
}
