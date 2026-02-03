package com.project.bookstack.services.member;

import java.util.List;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.CurrentlyBorrowedBooksDTO;

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

	List<BookNameReturnDateDTO> getBorrrowedBooksHistory();

	List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks();
	
	String renewBook(Integer userId, Integer bookId);
    
}
