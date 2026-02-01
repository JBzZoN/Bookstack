package com.project.bookstack.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DueBookDto {
	LocalDate dueDate;
	Integer numberOfCopies;
	Integer bookId;
}
