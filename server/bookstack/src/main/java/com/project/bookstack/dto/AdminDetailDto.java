package com.project.bookstack.dto;

public record AdminDetailDto(
    String isbn,
    String title,
    String author,
    String description,
    String publisher,
    Integer edition
) {}

