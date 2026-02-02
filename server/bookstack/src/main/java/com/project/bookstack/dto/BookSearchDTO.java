package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookSearchDTO {

    private Integer bookId;
    private String title;
    private String author;
    private String publisher;
    private String isbn;
}
