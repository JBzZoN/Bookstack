package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Book Comment Entity
 * =========================================================================
 * Stores textual reviews and comments provided by members for specific books.
 */
@Entity
@Table(name = "book_comment")
@Data
public class BookComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    @Column(name = "book_id", nullable = false)
    private Integer bookId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(name = "comment_date")
    private LocalDateTime createdAt;

}
