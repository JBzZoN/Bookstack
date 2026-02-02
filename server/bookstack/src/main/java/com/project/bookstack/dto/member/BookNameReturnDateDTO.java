package com.project.bookstack.dto.member;

import java.time.LocalDate;

public record BookNameReturnDateDTO(
    String bookName,
    LocalDate returnDate
) {}

