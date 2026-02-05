package com.project.bookstack.controllers.member;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.CurrentlyBorrowedBooksDTO;
import com.project.bookstack.services.member.MemberService;

import lombok.RequiredArgsConstructor;

/**
 * Member Controller
 * =========================================================================
 * Handles all member-facing read operations for the book catalog and account
 * activity.
 * This includes discovery features (Trending, Recommended) and borrowing
 * history.
 */
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * Retrieves all books for the main catalog view.
     */
    @GetMapping("/books")
    public List<BookCardDTO> getAllBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getAllBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves all books currently liked by the member.
     */
    @GetMapping("/liked-books")
    public List<BookCardDTO> getAllLikedBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getAllLikedBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves a set of recommended books for the user.
     */
    @GetMapping("/recommended-books")
    public List<BookCardDTO> getRecommendedBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getRecommendedBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves trending books based on platform activity.
     */
    @GetMapping("/trending-books")
    public List<BookCardDTO> getTrendingBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getTrendingBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves the most recently added books to the library.
     */
    @GetMapping("/new-arrived-books")
    public List<BookCardDTO> getNewArrivedBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getNewArrivedBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves all recommended books (paginated/full list).
     */
    @GetMapping("/all-recommended-books")
    public List<BookCardDTO> getAllRecommendedBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getAllRecommendedBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves all trending books (full list).
     */
    @GetMapping("/all-trending-books")
    public List<BookCardDTO> getAllTrendingBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getAllTrendingBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves all new arrivals (full list).
     */
    @GetMapping("/all-new-arrived-books")
    public List<BookCardDTO> getAllNewArrivedBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getAllNewArrivedBooks(Integer.parseInt(id));
    }

    /**
     * Retrieves full details for a specific book.
     */
    @GetMapping("/book/{id}")
    public BookDTO getBookDetails(@RequestHeader("X-User-Id") String id, @PathVariable("id") Integer bookId) {
        return memberService.getBookDetails(Integer.parseInt(id), bookId);
    }

    /**
     * Retrieves a list of suggested books similar to the one specified.
     */
    @GetMapping("/might-liked-books/{id}")
    public List<BookCardDTO> getMightAlsoLikedBooks(@RequestHeader("X-User-Id") String id,
            @PathVariable("id") Integer bookId) {
        return memberService.getMightAlsoLikedBooks(Integer.parseInt(id), bookId);
    }

    /**
     * Retrieves the complete historical list of borrowed and returned books.
     */
    @GetMapping("/history-borrowed-books")
    public List<BookNameReturnDateDTO> getBorrrowedBooksHistory(@RequestHeader("X-User-Id") String id) {
        return memberService.getBorrrowedBooksHistory(Integer.parseInt(id));
    }

    /**
     * Retrieves a list of books the member is currently in possession of.
     */
    @GetMapping("/currently-borrowed-books")
    public List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks(@RequestHeader("X-User-Id") String id) {
        return memberService.getCurrentlyBorrowedBooks(Integer.parseInt(id));
    }
}
