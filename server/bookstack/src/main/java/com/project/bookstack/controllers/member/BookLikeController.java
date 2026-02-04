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

@RestController
@RequestMapping("/member/likes")
@RequiredArgsConstructor
public class BookLikeController {

    private final BookLikeService bookLikeService;

    @PostMapping("/toggle")
    public Map<String, Boolean> toggleLike(@RequestHeader("X-User-Id") String userIdStr,
            @RequestBody Map<String, Integer> body) {

        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        Integer userId = Integer.parseInt(userIdStr);
        Integer bookId = body.get("bookId");

        boolean liked = bookLikeService.toggleLike(userId, bookId);

        return Map.of("liked", liked);
    }

    @GetMapping
    public List<Integer> getLikedBooks(@RequestHeader("X-User-Id") String userIdStr) {
        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        Integer userId = Integer.parseInt(userIdStr);
        return bookLikeService.getLikedBooks(userId);
    }

}
