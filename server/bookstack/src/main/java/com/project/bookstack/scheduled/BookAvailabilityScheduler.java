package com.project.bookstack.scheduled;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.project.bookstack.entities.BookNotify;
import com.project.bookstack.repositories.BookNotifyRepository;
import com.project.bookstack.client.BookClient;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class BookAvailabilityScheduler {

    @Autowired
    private BookNotifyRepository bookNotifyRepository;

    @Autowired
    private BookClient bookClient;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "book-available-topic";

    @Scheduled(cron = "0 * * * * *") // Runs every minute
    public void convertRequestsToNotifications() {
        log.info("Running BookAvailabilityScheduler...");

        // 1. Get all pending notifications
        List<BookNotify> pendingRequests = bookNotifyRepository.findAll();
        log.info("DEBUG_SCHEDULER: Found {} pending requests.", pendingRequests.size());

        if (pendingRequests.isEmpty()) {
            return;
        }

        // 2. Get distinct book IDs requested
        Set<Long> bookIds = pendingRequests.stream()
                .map(BookNotify::getBookId)
                .collect(Collectors.toSet());

        for (Long bookId : bookIds) {
            // 3. Check if book is available using BookClient (Feign)
            try {
                log.info("DEBUG_SCHEDULER: Checking availability for bookId: {}", bookId);
                Integer copies = bookClient.getCopies(bookId.intValue());
                log.info("DEBUG_SCHEDULER: BookId: {} has {} copies.", bookId, copies);

                if (copies != null && copies > 0) {
                    log.info("Book {} is now available (Copies: {}). Sending notification event.", bookId, copies);

                    // 4. Send event to Kafka (Messaging Service handles email)
                    kafkaTemplate.send(TOPIC, bookId);
                }
            } catch (Exception e) {
                log.error("DEBUG_SCHEDULER: Failed to check availability for bookId: " + bookId, e);
            }
        }
    }
}
