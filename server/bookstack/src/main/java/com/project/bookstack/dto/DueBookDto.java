package com.project.bookstack.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Due Book DTO
 * =========================================================================
 * Tracks overdue book copies with due dates.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DueBookDto {
	LocalDate dueDate;
	Integer numberOfCopies;
	Integer bookId;
}
