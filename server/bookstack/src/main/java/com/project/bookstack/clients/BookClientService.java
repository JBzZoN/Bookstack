package com.project.bookstack.clients;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookCoreDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookIdTitleDTO;

@Service
@FeignClient(name = "book-service", url = "http://localhost:4040")
public interface BookClientService {

	@GetMapping("book/books")
    List<BookCoreDTO> getAllBooks();
	
	@PostMapping("book/liked-books")
	List<BookCoreDTO> getAllLikedBooks(@RequestBody List<Integer> LikedBookIds);
	
	@PostMapping("book/recommended-books")
	List<BookCoreDTO> getRecommendedBooks(@RequestBody List<Integer> recommendedBookIds);
	
	@PostMapping("book/trending-books")
	List<BookCoreDTO> getTrendingBooks(@RequestBody List<Integer> trendingBookIds);
	
	@GetMapping("book/new-arrived-books")
	List<BookCoreDTO> getNewArrivedBooks();
	
	@PostMapping("book/all-recommended-books")
	List<BookCoreDTO> getAllRecommendedBooks(@RequestBody List<Integer> recommendedBookIds);
	
	@PostMapping("book/all-trending-books")
	List<BookCoreDTO> getAllTrendingBooks(@RequestBody List<Integer> trendingBookIds);
	
	@GetMapping("book/all-new-arrived-books")
	List<BookCoreDTO> getAllNewArrivedBooks();
	
	@GetMapping("book/book/{bookId}")
	BookDTO getBookDetails(@PathVariable("bookId") Integer bookId);
	
	@PostMapping("book/might-liked-books/{bookId}")
	List<BookCoreDTO> getMightAlsoLikedBooks(@PathVariable("bookId") Integer bookId , @RequestBody List<Integer> mightLikeBookIds);
	
	@PostMapping("book/names-by-id")
	List<BookIdTitleDTO> getBookNamesByIds(@RequestBody List<Integer> bookIds);

}
