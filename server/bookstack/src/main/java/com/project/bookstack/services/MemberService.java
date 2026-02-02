package com.project.bookstack.services;

import java.util.List;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.ReviewDTO;

public interface MemberService {
	
    List<BookCardDTO> getAllBooks();

	List<BookCardDTO> getAllLikedBooks();
	
	List<BookCardDTO> getRecommendedBooks();
	
	List<BookCardDTO> getTrendingBooks();
	
	List<BookCardDTO> getNewArrivedBooks();
	
	List<BookCardDTO> getAllRecommendedBooks();
	
	List<BookCardDTO> getAllTrendingBooks();
	
	List<BookCardDTO> getAllNewArrivedBooks();

	BookDTO getBookDetails(Integer bookId);

	List<BookCardDTO> getMightAlsoLikedBooks(Integer bookId);
	
	public List<BookNameReturnDateDTO> getBorrrowedBooksHistory();
	
	

}
