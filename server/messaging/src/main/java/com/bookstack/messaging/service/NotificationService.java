package com.bookstack.messaging.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookstack.messaging.repository.BookNotifyRepository;

/**
 * Notification Service
 * =========================================================================
 * Manages user notifications for book availability.
 * When a book becomes available, this service sends email alerts to all
 * members who requested to be notified.
 */
@Service
@Transactional
public class NotificationService {

    @Autowired
    private BookNotifyRepository bookNotifyRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${bookstack.from.email}")
    private String fromEmailAddress;

    /**
     * Broadcasts availability notifications to waiting users.
     * Records are deleted from the notification queue only after a successful
     * email delivery.
     * 
     * @param bookId The ID of the book that is now available.
     */
    public void notifyUsers(Long bookId) {

        // fetch users who are waiting via simple query
        List<com.bookstack.messaging.entity.BookNotify> notifyList = bookNotifyRepository
                .findByBookId(bookId);

        System.out.println("LOG_CHECK: Found " + notifyList.size() + " notifications for bookId: " + bookId);

        for (com.bookstack.messaging.entity.BookNotify notify : notifyList) {

            MimeMessagePreparator message = mimeMessage -> {
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false);

                helper.setFrom(fromEmailAddress);
                helper.setTo(notify.getEmail());
                helper.setSubject("Book Available | BookStack Library");
                helper.setText(
                        "Good news!\n\n" +
                                "The book you requested is now available in the library.\n" +
                                "Please login to BookStack and borrow it before it runs out.\n\n" +
                                "Happy Reading!\nBookStack Team");
            };

            try {
                javaMailSender.send(message);
                System.out.println("LOG_CHECK: Email sent to " + notify.getEmail() + " for bookId: " + bookId);

                // Delete ONLY if email is sent successfully
                bookNotifyRepository.delete(notify);
                System.out.println("LOG_CHECK: Deleted notification record for " + notify.getEmail());

            } catch (Exception e) {
                System.out.println(
                        "LOG_CHECK: Failed to send email to " + notify.getEmail() + " Error: " + e.getMessage());
            }
        }
    }
}
