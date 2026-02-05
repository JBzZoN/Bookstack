package com.project.bookstack.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/**
 * Book Availability Producer
 * =========================================================================
 * Kafka producer service for publishing book availability notifications.
 * Sends events to the "book-available-topic" when books become available,
 * triggering email notifications to users who requested to be notified.
 */
@Service
public class BookAvailabilityProducer {

    private static final String TOPIC = "book-available-topic";

    @Autowired
    private KafkaTemplate<String, Long> kafkaTemplate;

    public void publishBookAvailableEvent(Long bookId) {
        kafkaTemplate.send(TOPIC, bookId);
    }
}
