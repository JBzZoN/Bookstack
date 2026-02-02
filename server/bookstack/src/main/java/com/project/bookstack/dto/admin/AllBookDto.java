package com.project.bookstack.dto.admin;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Setter
@Getter
public class AllBookDto {

	private int book_id;
	private String isbn;
	private String title;
	private String author;
	private String book_image;
	private String action;
	private LocalDate action_date;
	private int number_of_copies;
	private int number_of_copies_remaining;
	private LocalDateTime created_at;
	private LocalDateTime updated_at;
	
}
