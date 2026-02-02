package com.project.bookstack.dto.member;

import java.util.List;

public record BookDTO (
   	Integer bookId,
   	String isbn,
    String title,
    String author,
    String description,
    List<String> genres,
    String publisher,
    Integer numberOfCopies,
    Integer numberOfCopiesRemaining,
    Double averageRatings,
	Boolean likedByCurrentUser,
    String bookImage	    
) {}
