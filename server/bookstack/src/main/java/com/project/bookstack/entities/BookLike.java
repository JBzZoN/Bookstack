package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Book Like Entity
 * =========================================================================
 * Tracks "Like" status for books per user.
 * Ensures a unique constraint between user_id and book_id to prevent
 * duplicates.
 */
@Entity
@Table(name = "book_like", uniqueConstraints = {
        @UniqueConstraint(name = "uq_user_book_like", columnNames = { "user_id", "book_id" })
})
@Data
public class BookLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Integer likeId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "book_id", nullable = false)
    private Integer bookId;

}
