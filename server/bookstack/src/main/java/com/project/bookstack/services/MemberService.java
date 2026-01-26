package com.project.bookstack.services;

import java.util.List;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;

public interface MemberService {
	
    List<BookCardDTO> getAllBooks();

	List<BookCardDTO> getAllLikedBooks();
	
	List<BookCardDTO> getRecommendedBooks();
    
}
