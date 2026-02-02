package com.project.bookstack.dto.member;

import java.time.LocalDate;

public record BookIdReturnDateDTO(
    Integer bookId,
    LocalDate returnDate
) {}

