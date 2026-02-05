package com.project.bookstack.dto.admin;

public record AdminDetailDto(
        String isbn,
        String title,
        String author,
        String description,
        String publisher,
        Integer edition) {
}
