package com.project.bookstack.dto.member;

import java.time.LocalDate;

public record BookDTO (
	   	Integer bookId,
	   	String isbn,
	    String title,
	    String author,
	    String description,
	    String publisher,
	    Integer edition,
	    String action,
	    LocalDate actionDate,
	    Integer numberOfCopies,
	    Integer numberOfCopiesRemaining,
	    String bookImage
) {}
