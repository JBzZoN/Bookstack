package com.project.bookstack.services.member;

import java.util.List;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.CurrentlyBorrowedBooksDTO;

public interface MemberService {

	List<BookCardDTO> getAllBooks(Integer userId);

	List<BookCardDTO> getAllLikedBooks(Integer userId);

	List<BookCardDTO> getRecommendedBooks(Integer userId);

	List<BookCardDTO> getTrendingBooks(Integer userId);

	List<BookCardDTO> getNewArrivedBooks(Integer userId);

	List<BookCardDTO> getAllRecommendedBooks(Integer userId);

	List<BookCardDTO> getAllTrendingBooks(Integer userId);

	List<BookCardDTO> getAllNewArrivedBooks(Integer userId);

	BookDTO getBookDetails(Integer bookId, Integer userId);

	List<BookCardDTO> getMightAlsoLikedBooks(Integer bookId, Integer userId);

	List<BookCardDTO> getAllMightAlsoLikedBooks(Integer bookId, Integer userId);

	List<BookNameReturnDateDTO> getBorrrowedBooksHistory(Integer userId);

	List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks(Integer userId);

	String renewBook(Integer userId, Integer bookId);

	com.project.bookstack.dto.member.MemberLimitsDTO getCurrentPlan(Integer userId);

	String notifyMe(Integer userId, Integer bookId);

	boolean checkNotifyStatus(Integer userId, Integer bookId);
}
