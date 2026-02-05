package com.bookstack.messaging.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.bookstack.messaging.service.NotificationService;

@Service
public class BookAvailabilityConsumer {

    @Autowired
    private NotificationService service;

    @KafkaListener(topics = "book-available-topic", groupId = "${spring.kafka.consumer.group-id}")
    public void consume(Long bookId) {
        service.notifyUsers(bookId);
    }
}
