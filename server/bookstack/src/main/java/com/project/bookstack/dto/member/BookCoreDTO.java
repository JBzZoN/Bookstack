package com.project.bookstack.dto.member;

public record BookCoreDTO(
    Integer bookId,
    String title,
    String author,
    String bookImage
) {}

