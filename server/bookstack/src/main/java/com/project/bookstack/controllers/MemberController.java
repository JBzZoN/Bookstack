package com.project.bookstack.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.services.MemberService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/books")
    public List<BookCardDTO> getAllBooks() {
        return memberService.getAllBooks();
    }
    
    @GetMapping("/liked-books")
    public List<BookCardDTO> getAllLikedBooks() {
        return memberService.getAllLikedBooks();
    }
    
    @GetMapping("/recommended-books")
    public List<BookCardDTO> getRecommendedBooks() {
        return memberService.getRecommendedBooks();
    }
    
    @GetMapping("/trending-books")
    public List<BookCardDTO> getTrendingBooks() {
        return memberService.getTrendingBooks();
    }
    
    @GetMapping("/new-arrived-books")
    public List<BookCardDTO> getNewArrivedBooks() {
        return memberService.getNewArrivedBooks();
    }
    
    @GetMapping("/all-recommended-books")
    public List<BookCardDTO> getAllRecommendedBooks() {
        return memberService.getAllRecommendedBooks();
    }
    
    @GetMapping("/all-trending-books")
    public List<BookCardDTO> getAllTrendingBooks() {
        return memberService.getAllTrendingBooks();
    }
    
    @GetMapping("/all-new-arrived-books")
    public List<BookCardDTO> getAllNewArrivedBooks() {
        return memberService.getAllNewArrivedBooks();
    }
    
    @GetMapping("/book/{id}")
    public BookDTO getBookDetails(@PathVariable("id") Integer bookId) {
        return memberService.getBookDetails(bookId);
    }
    
    @GetMapping("/might-liked-books/{id}")
    public List<BookCardDTO> getMightAlsoLikedBooks(@PathVariable("id") Integer bookId) {
        return memberService.getMightAlsoLikedBooks(bookId);
    }

}
