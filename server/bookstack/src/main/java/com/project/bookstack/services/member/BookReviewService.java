package com.project.bookstack.services.member;

import java.util.List;

import com.project.bookstack.dto.member.ReviewDTO;

/**
 * Service for managing book reviews and ratings.
 */
public interface BookReviewService {

    /**
     * Retrieves all reviews and ratings for a specific book.
     * 
     * @param bookId The ID of the book.
     * @return List of reviews.
     */
    List<ReviewDTO> getReviews(Integer bookId);

    /**
     * Adds or updates a review and rating for a book.
     * 
     * @param bookId  The ID of the book.
     * @param userId  The ID of the user.
     * @param rating  The star rating (1-5).
     * @param comment The textual review.
     */
    void addReview(Integer bookId, Integer userId, Integer rating, String comment);

}
