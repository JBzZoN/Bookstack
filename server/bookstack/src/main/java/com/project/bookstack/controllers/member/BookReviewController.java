package com.project.bookstack.controllers.member;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.services.member.BookReviewService;

import lombok.RequiredArgsConstructor;

/**
 * Book Review Controller
 * =========================================================================
 * Manages member-submitted reviews and ratings for books.
 */
@RestController
@RequestMapping("/member/books")
@RequiredArgsConstructor
public class BookReviewController {

    private final BookReviewService reviewService;

    /**
     * Retrieves all reviews associated with a specific book.
     */
    @GetMapping("/{bookId}/reviews")
    public List<ReviewDTO> getReviews(@PathVariable Integer bookId) {
        return reviewService.getReviews(bookId);
    }

    /**
     * Submits a new review and rating for a book.
     */
    @PostMapping("/{bookId}/reviews")
    public ResponseEntity<?> addReview(
            @RequestHeader("X-User-Id") String id,
            @PathVariable Integer bookId,
            @RequestBody Map<String, Object> body) {

        Integer userId = Integer.parseInt(id);

        Integer rating = (Integer) body.get("rating");
        String comment = (String) body.get("comment");

        reviewService.addReview(
                bookId,
                userId,
                rating,
                comment);

        return ResponseEntity.ok(Map.of("message", "Review added"));
    }
}
