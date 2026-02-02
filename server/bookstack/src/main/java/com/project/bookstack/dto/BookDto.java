package com.project.bookstack.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;

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
        String image
) {}
