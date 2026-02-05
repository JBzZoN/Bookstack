package com.bookstack.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstack.messaging.service.NotificationService;

/**
 * Test Notification Controller
 * =========================================================================
 * Provides utility endpoints for testing the notification broadcast system
 * manually. Not intended for production use by end-users.
 */
@RestController
@RequestMapping("/test")
public class TestNotificationController {

    @Autowired
    private NotificationService notificationService;

    /**
     * Manually triggers book availability notifications for a specific book ID.
     * 
     * @param bookId The ID of the book to broadcast notifications for.
     * @return Confirmation message.
     */
    @PostMapping("/notify/{bookId}")
    public String triggerNotification(@PathVariable Long bookId) {
        notificationService.notifyUsers(bookId);
        return "Notification process triggered for bookId: " + bookId;
    }
}
