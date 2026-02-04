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
            @RequestHeader("X-User-Id") String userIdStr,
            @RequestBody Map<String, Object> body) {

        if (userIdStr.contains(",")) {
            userIdStr = userIdStr.split(",")[0].trim();
        }
        Integer userId = Integer.parseInt(userIdStr);

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
