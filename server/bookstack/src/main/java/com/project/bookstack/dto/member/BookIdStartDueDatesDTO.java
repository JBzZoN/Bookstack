package com.project.bookstack.dto.member;

import java.time.LocalDate;

public record BookIdStartDueDatesDTO (
		Integer bookId,
		LocalDate startDate,
		LocalDate endDate
) {}
