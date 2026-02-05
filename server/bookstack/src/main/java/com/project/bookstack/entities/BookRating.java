package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Book Rating Entity
 * =========================================================================
 * Stores numerical ratings (e.g., 1-5 stars) given by users to books.
 * Used to calculate average ratings for discovery features.
 */
@Entity
@Table(name = "book_rating")
@Data
public class BookRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Integer ratingId;

    @Column(name = "book_id", nullable = false)
    private Integer bookId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "rating", nullable = false)
    private Integer rating;
}

