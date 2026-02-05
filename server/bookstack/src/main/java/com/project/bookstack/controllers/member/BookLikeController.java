package com.project.bookstack.controllers.member;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.services.member.BookLikeService;

import lombok.RequiredArgsConstructor;

/**
 * Book Like Controller
 * =========================================================================
 * Manages member interactions with the "Like" feature for books.
 * Allows users to toggle likes and retrieve their list of liked book IDs.
 */
@RestController
@RequestMapping("/member/likes")
@RequiredArgsConstructor
public class BookLikeController {

    private final BookLikeService bookLikeService;

    /**
     * Toggles the "Like" status for a specific book.
     */
    @PostMapping("/toggle")
    public Map<String, Boolean> toggleLike(@RequestHeader("X-User-Id") String id,
            @RequestBody Map<String, Integer> body) {
        Integer userId = Integer.parseInt(id);
        Integer bookId = body.get("bookId");

        boolean liked = bookLikeService.toggleLike(userId, bookId);

        return Map.of("liked", liked);
    }

    /**
     * Retrieves the list of all book IDs liked by the current member.
     */
    @GetMapping
    public List<Integer> getLikedBooks(@RequestHeader("X-User-Id") String id) {
        return bookLikeService.getLikedBooks(Integer.parseInt(id));
    }
}
