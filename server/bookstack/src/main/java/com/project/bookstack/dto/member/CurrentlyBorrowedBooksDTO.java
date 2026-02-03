package com.project.bookstack.dto.member;

import java.time.LocalDate;

public record CurrentlyBorrowedBooksDTO (
		Integer bookId,
		String title,
		LocalDate startDate,
		LocalDate endDate
) {}
