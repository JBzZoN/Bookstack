package com.project.bookstack.repositories.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.BookRating;

/**
 * Book Rating Repository
 * =========================================================================
 * Repository for managing user book ratings and reviews.
 * Handles operations for finding and storing user ratings for specific books.
 */
public interface BookRatingRepository
        extends JpaRepository<BookRating, Integer> {

    Optional<BookRating> findByBookIdAndUserId(Integer bookId, Integer userId);

}
