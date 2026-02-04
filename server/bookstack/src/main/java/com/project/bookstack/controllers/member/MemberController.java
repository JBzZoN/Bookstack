package com.project.bookstack.controllers.member;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.CurrentlyBorrowedBooksDTO;
import com.project.bookstack.services.member.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/books")
    public List<BookCardDTO> getAllBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getAllBooks(Integer.parseInt(id));
    }

    @GetMapping("/liked-books")
    public List<BookCardDTO> getAllLikedBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getAllLikedBooks(Integer.parseInt(id));
    }

    @GetMapping("/recommended-books")
    public List<BookCardDTO> getRecommendedBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getRecommendedBooks(Integer.parseInt(id));
    }

    @GetMapping("/trending-books")
    public List<BookCardDTO> getTrendingBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getTrendingBooks(Integer.parseInt(id));
    }

    @GetMapping("/new-arrived-books")
    public List<BookCardDTO> getNewArrivedBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getNewArrivedBooks(Integer.parseInt(id));
    }

    @GetMapping("/all-recommended-books")
    public List<BookCardDTO> getAllRecommendedBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getAllRecommendedBooks(Integer.parseInt(id));
    }

    @GetMapping("/all-trending-books")
    public List<BookCardDTO> getAllTrendingBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getAllTrendingBooks(Integer.parseInt(id));
    }

    @GetMapping("/all-new-arrived-books")
    public List<BookCardDTO> getAllNewArrivedBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getAllNewArrivedBooks(Integer.parseInt(id));
    }

    @GetMapping("/book/{id}")
    public BookDTO getBookDetails(@PathVariable("id") Integer bookId, @RequestHeader("X-User-Id") String userIdStr) {
        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        return memberService.getBookDetails(bookId, Integer.parseInt(userIdStr));
    }

    @GetMapping("/might-liked-books/{id}")
    public List<BookCardDTO> getMightAlsoLikedBooks(@PathVariable("id") Integer bookId,
            @RequestHeader("X-User-Id") String userIdStr) {
        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        return memberService.getMightAlsoLikedBooks(bookId, Integer.parseInt(userIdStr));
    }

    @GetMapping("/history-borrowed-books")
    public List<BookNameReturnDateDTO> getBorrrowedBooksHistory(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getBorrrowedBooksHistory(Integer.parseInt(id));
    }

    @GetMapping("/currently-borrowed-books")
    public List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        return memberService.getCurrentlyBorrowedBooks(Integer.parseInt(id));
    }

    @PostMapping("/renew")
    public org.springframework.http.ResponseEntity<String> renewBook(
            @RequestHeader("X-User-Id") String userIdStr,
            @org.springframework.web.bind.annotation.RequestBody java.util.Map<String, Integer> payload) {

        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        Integer userId = Integer.parseInt(userIdStr);
        Integer bookId = payload.get("bookId");
        String result = memberService.renewBook(userId, bookId);
        if (result.contains("successfully")) {
            return org.springframework.http.ResponseEntity.ok(result);
        } else {
            return org.springframework.http.ResponseEntity.badRequest().body(result);
        }

    }

    @GetMapping("/current-plan")
    public com.project.bookstack.dto.member.MemberLimitsDTO getCurrentPlan(@RequestHeader("X-User-Id") String id) {
        if (id.contains(","))
            id = id.split(",")[0].trim();
        Integer userId = Integer.parseInt(id);
        return memberService.getCurrentPlan(userId);
    }

    @Autowired
    private com.project.bookstack.services.NotificationService notificationService;

    @PostMapping("/notify")
    public ResponseEntity<String> notifyMe(
            @RequestHeader("X-User-Id") String userIdStr,
            @RequestBody java.util.Map<String, Object> payload) {

        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        Integer userId = Integer.parseInt(userIdStr);
        Integer bookId = Integer.parseInt(payload.get("bookId").toString());
        // Email is no longer required from payload; fetched via AuthClient in Service

        String result = memberService.notifyMe(userId, bookId);
        if (result.contains("scheduled") || result.contains("already requested")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/check-notify-status/{bookId}")
    public ResponseEntity<Boolean> checkNotifyStatus(
            @RequestHeader("X-User-Id") String userIdStr,
            @PathVariable Integer bookId) {

        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        Integer userId = Integer.parseInt(userIdStr);
        boolean isPending = memberService.checkNotifyStatus(userId, bookId);
        return ResponseEntity.ok(isPending);
    }

    @GetMapping("/all-might-liked-books/{id}")
    public List<BookCardDTO> getAllMightAlsoLikedBooks(@PathVariable("id") Integer bookId,
            @RequestHeader("X-User-Id") String userIdStr) {
        if (userIdStr.contains(","))
            userIdStr = userIdStr.split(",")[0].trim();
        return memberService.getAllMightAlsoLikedBooks(bookId, Integer.parseInt(userIdStr));
    }

    @PostMapping("/test-notify")
    public ResponseEntity<String> testNotify(
            @RequestBody java.util.Map<String, Object> payload) {

        try {
            Integer bookId = Integer.parseInt(payload.get("bookId").toString());
            String email = payload.get("email").toString();
            notificationService.sendTestNotification(email, bookId);
            return ResponseEntity.ok("Test email sent to " + email);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send test email: " + e.getMessage());
        }
    }

}
