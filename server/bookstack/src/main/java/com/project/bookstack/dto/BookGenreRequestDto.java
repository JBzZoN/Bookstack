package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookGenreRequestDto {
	String genres;
	Integer bookId;
}
