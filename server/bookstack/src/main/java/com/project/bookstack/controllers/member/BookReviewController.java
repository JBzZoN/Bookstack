package com.project.bookstack.controllers.member;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.services.member.BookReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member/books")
@RequiredArgsConstructor
public class BookReviewController {

    private final BookReviewService reviewService;

    @GetMapping("/{bookId}/reviews")
    public List<ReviewDTO> getReviews(
            @PathVariable Integer bookId) {

        return reviewService.getReviews(bookId);
        
    }

    @PostMapping("/{bookId}/reviews")
    public ResponseEntity<?> addReview(
            @PathVariable Integer bookId,
            @RequestBody Map<String, Object> body,
            org.apache.tomcat.util.net.openssl.ciphers.Authentication authentication) {

    	Integer userId = 1;

        Integer rating = (Integer) body.get("rating");
        String comment = (String) body.get("comment");

        reviewService.addReview(
                bookId,
                userId,
                rating,
                comment
        );

        return ResponseEntity.ok(Map.of("message", "Review added"));
    }
}
