package com.project.bookstack.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.NotifyMeDto;
import com.project.bookstack.services.BookNotifyService;

import lombok.RequiredArgsConstructor;

/**
 * Book Notification Controller
 * =========================================================================
 * Manages user requests to be notified when an out-of-stock book becomes
 * available.
 */
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class BookNotifyController {

    private final BookNotifyService service;

    /**
     * Registers a new notification request for a book.
     * 
     * @param dto Contains user email and target bookId.
     * @return Confirmation message.
     */
    @PostMapping("/notify")
    public ResponseEntity<String> notifyMe(@RequestBody NotifyMeDto dto) {
        service.saveNotifyRequest(dto);
        return ResponseEntity.ok("You will be notified when the book is available");
    }

    /**
     * Checks if a notification request is already pending for a specific user and
     * book.
     * 
     * @param bookId The ID of the book.
     * @param email  The user's email address.
     * @return True if a request exists, false otherwise.
     */
    @GetMapping("/check-notify-status/{bookId}")
    public ResponseEntity<Boolean> checkNotifyStatus(
            @PathVariable Integer bookId,
            @RequestParam String email) {
        return ResponseEntity.ok(service.isNotifyPending(bookId, email));
    }
}
