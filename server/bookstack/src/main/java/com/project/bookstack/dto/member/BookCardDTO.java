package com.project.bookstack.dto.member;

public record BookCardDTO(
	Integer bookId,
	String title,
	String author,
	String bookImage,
	Double averageRatings,
	Boolean likedByCurrentUser
) {}




