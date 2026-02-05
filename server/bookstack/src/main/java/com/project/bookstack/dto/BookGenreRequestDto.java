package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Book Genre Request DTO
 * =========================================================================
 * Used for associating genres with books.
 */
@Data
@AllArgsConstructor
public class BookGenreRequestDto {
	String genres;
	Integer bookId;
}
