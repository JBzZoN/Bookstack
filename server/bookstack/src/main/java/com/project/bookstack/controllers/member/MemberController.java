package com.project.bookstack.controllers.member;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.BookSearchDTO;
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
    
    @GetMapping("/history-borrowed-books")
    public List<BookNameReturnDateDTO> getBorrrowedBooksHistory() {
    	return memberService.getBorrrowedBooksHistory();
    }
    
    @GetMapping("/currently-borrowed-books")
    public List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks() {
    	return memberService.getCurrentlyBorrowedBooks();
    }
    
    @PostMapping("/renew")
    public org.springframework.http.ResponseEntity<String> renewBook(
            @RequestHeader("X-User-Id") String userIdStr,
            @org.springframework.web.bind.annotation.RequestBody java.util.Map<String, Integer> payload) {
      
    	Integer userId = Integer.parseInt(userIdStr);
    	Integer bookId = payload.get("bookId");
    	String result = memberService.renewBook(userId, bookId);
    	if (result.contains("successfully")) {
    	    return org.springframework.http.ResponseEntity.ok(result);
    	} else {
    	    return org.springframework.http.ResponseEntity.badRequest().body(result);
    	}
       
    }
    
    @GetMapping("/renew-limits")
    public com.project.bookstack.dto.member.MemberLimitsDTO getMemberLimits(@RequestHeader("X-User-Id") String id) {
    	Integer userId = Integer.parseInt(id);
        return memberService.getMemberLimits(userId);
    }
    
    @Autowired
    private com.project.bookstack.services.NotificationService notificationService;
    
    @PostMapping("/notify")
    public ResponseEntity<String> notifyMe(
            @RequestHeader("X-User-Id") String userIdStr,
            @RequestBody java.util.Map<String, Object> payload) {
        
        Integer userId = Integer.parseInt(userIdStr);
        Integer bookId = Integer.parseInt(payload.get("bookId").toString());
        String email = payload.get("email").toString();
        
        String result = notificationService.createNotificationRequest(userId, bookId, email);
        if (result.contains("scheduled")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/check-notify-status/{bookId}")
    public ResponseEntity<Boolean> checkNotifyStatus(
            @RequestHeader("X-User-Id") String userIdStr,
            @PathVariable Integer bookId) {
        
        Integer userId = Integer.parseInt(userIdStr);
        boolean isPending = notificationService.isNotificationPending(userId, bookId);
        return ResponseEntity.ok(isPending);
    }

}
