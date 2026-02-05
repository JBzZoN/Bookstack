package com.project.bookstack.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;

/**
 * Book DTO
 * =========================================================================
 * General-purpose DTO for book operations across staff and admin workflows.
 * Includes metadata, inventory tracking, and action history.
 */
public record BookDto(
                String isbn,
                String title,
                String author,
                String description,
                String publisher,
                Integer userId,
                String action,
                LocalDate actionDate,
                Integer bookId,
                Integer numberOfCopies,
                Integer numberOfCopiesRemaining,
                String image) {
}
