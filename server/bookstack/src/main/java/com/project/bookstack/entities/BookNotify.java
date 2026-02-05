package com.project.bookstack.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Book Notify Entity
 * =========================================================================
 * Stores subscription requests for books that are currently out of stock.
 * Used by the notification system to send alerts when copies become available.
 */
@Entity
@Table(name = "book_notify")
@Data
public class BookNotify {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookId;
    private String email;
}
