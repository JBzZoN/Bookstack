package com.project.bookstack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.project.bookstack.entities.Notification;
import com.project.bookstack.repositories.NotificationRepository;
import com.project.bookstack.clients.staff.BookClient;
import com.project.bookstack.dto.BookDto;
import com.project.bookstack.entities.Book;
import com.project.bookstack.repositories.StaffBookRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final org.springframework.kafka.core.KafkaTemplate<String, com.project.bookstack.dto.EmailDTO> kafkaTemplate;
    private final StaffBookRepository bookRepository;

    @Scheduled(cron = "0 * * * * *") // Run every minute
    public void processPendingNotifications() {
        System.out.println("Running scheduled notification check...");
        List<Integer> bookIds = notificationRepository.findDistinctBookIds();

        for (Integer bookId : bookIds) {
            bookRepository.findById(bookId).ifPresent(book -> {
                if (book.getNumberOfCopiesRemaining() > 0) {
                    System.out.println("Book " + bookId + " is now available. Sending notifications.");
                    notifyUsersForBook(bookId);
                }
            });
        }
    }

    public String createNotificationRequest(Integer userId, Integer bookId, String email) {
        if (notificationRepository.existsByUserIdAndBookId(userId, bookId)) {
            return "You have already requested a notification for this book.";
        }

        Notification notification = new Notification(userId, bookId, email);
        notificationRepository.save(notification);
        return "Notification scheduled. You will be notified when the book is available.";
    }

    public boolean isNotificationPending(Integer userId, Integer bookId) {
        return notificationRepository.existsByUserIdAndBookId(userId, bookId);
    }

    public void notifyUsersForBook(Integer bookId) {
        List<Notification> pendingNotifications = notificationRepository.findByBookId(bookId);

        if (pendingNotifications.isEmpty()) {
            return;
        }

        String bookTitle = "the book you requested";
        try {
            Book book = bookRepository.findById(bookId).orElse(null);
            if (book != null) {
                bookTitle = book.getTitle();
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch book details for notification: " + e.getMessage());
        }

        String finalBookTitle = bookTitle;

        for (Notification n : pendingNotifications) {
            try {
                sendEmail(n.getEmail(), finalBookTitle);
                notificationRepository.delete(n);
            } catch (Exception e) {
                System.err.println("Failed to notify " + n.getEmail() + ": " + e.getMessage());
            }
        }
    }

    private void sendEmail(String toEmail, String bookTitle) {
        String content = String.format(
                """
                        Dear Member,

                        Good news! The book "%s" is now available in the library.

                        You requested to be notified when this book became available. You can now login to your account and check the availability.

                        Best regards,
                        Team BOOKSTACK
                        """,
                bookTitle);

        try {
            System.out.println("DEBUG: Sending notification to notify-me-topic for " + toEmail);
            kafkaTemplate.send("notify-me-topic", new com.project.bookstack.dto.EmailDTO(content, toEmail));
        } catch (Exception e) {
            System.err.println("Failed to send Kafka message for " + toEmail + ": " + e.getMessage());
        }
    }

    public void sendTestNotification(String toEmail, Integer bookId) {
        String bookTitle = "Test Book";
        try {
            com.project.bookstack.entities.Book book = bookRepository.findById(bookId).orElse(null);
            if (book != null) {
                bookTitle = book.getTitle();
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch book details for test notification: " + e.getMessage());
        }

        sendEmail(toEmail, bookTitle);
    }
}
