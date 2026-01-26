package com.project.bookstack.services.impl;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.repositories.MemberRepository;
import com.project.bookstack.services.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public List<BookCardDTO> getAllBooks() {
    	Integer userId = 7; 
        return memberRepository.getAllBooks(userId);
    }
    
    @Override
    public List<BookCardDTO> getAllLikedBooks() {
    	Integer userId = 1; 
        return memberRepository.getAllLikedBooks(userId);
    }
    
    @Override
    public List<BookCardDTO> getRecommendedBooks() {
        Pageable pageable = (Pageable) PageRequest.of(0, 10);
        Integer userId = 11;
        return memberRepository.getRecommendedBooks(userId, pageable);
    }
    
    @Override
    public List<BookCardDTO> getTrendingBooks() {
        Pageable pageable = (Pageable) PageRequest.of(0, 10);
        Integer userId = 11;
        return memberRepository.getTrendingBooks(userId, pageable);
    }
    
    @Override
    public List<BookCardDTO> getNewArrivedBooks() {
    	Pageable pageable = (Pageable) PageRequest.of(0, 25);
        Integer userId = 11;
        return memberRepository.getNewArrivedBooks(userId,pageable);
    }
    
    @Override
    public List<BookCardDTO> getAllRecommendedBooks() {
        Integer userId = 11;
        return memberRepository.getAllRecommendedBooks(userId);
    }
        
    @Override
    public List<BookCardDTO> getAllTrendingBooks() {
        Integer userId = 11;
        return memberRepository.getAllTrendingBooks(userId);
    }
    
    @Override
    public List<BookCardDTO> getAllNewArrivedBooks() {
    	Pageable pageable = (Pageable) PageRequest.of(0, 24);
        Integer userId = 11;
        return memberRepository.getNewArrivedBooks(userId,pageable);
    }
    
    @Override
    public BookDTO getBookDetails(Integer bookId) {
    	Integer userId = 11;
        BookDTO core = memberRepository.getBookCore(bookId, userId);
        List<String> genres = memberRepository.getGenresByBookId(bookId);

        return new BookDTO(
            core.bookId(),
            core.isbn(),
            core.title(),
            core.author(),
            core.description(),
            genres,
            core.publisher(),
            core.numberOfCopies(),
            core.numberOfCopiesRemaining(),
            core.averageRatings(),
            core.likedByCurrentUser(),
            core.bookImage()
        );
    }
    
    @Override
    public List<BookCardDTO> getMightAlsoLikedBooks(Integer bookId) {
        Pageable pageable = (Pageable) PageRequest.of(0, 10);
        Integer userId = 11;
        return memberRepository.getMightAlsoLikedBooks(userId,bookId, pageable);
    }

    
}
