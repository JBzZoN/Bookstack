package com.project.bookstack.dto.member;

import java.util.List;

public record BookDescribedDTO (
   	Integer bookId,
   	String isbn,
    String title,
    String author,
    String description,
    String publisher,
    Integer numberOfCopies,
    Integer numberOfCopiesRemaining,
    String bookImage	    
) {}
