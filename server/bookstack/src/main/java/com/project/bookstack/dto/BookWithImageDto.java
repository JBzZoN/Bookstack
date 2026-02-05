package com.project.bookstack.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

/**
 * Book With Image DTO
 * =========================================================================
 * Used for creating new books with image upload support.
 */
public record BookWithImageDto(
		String title,
		String author,
		String publisher,
		String isbn,
		Integer copies,
		String description,
		String genres,
		MultipartFile imageFile,
		Integer staffId) {
}