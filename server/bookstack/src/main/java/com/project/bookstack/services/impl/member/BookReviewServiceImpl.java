package com.project.bookstack.services.impl.member;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.entities.BookComment;
import com.project.bookstack.entities.BookRating;
import com.project.bookstack.exception.ValidationException;
import com.project.bookstack.repositories.member.BookCommentRepository;
import com.project.bookstack.repositories.member.BookRatingRepository;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.member.BookReviewService;

import lombok.RequiredArgsConstructor;

/**
 * Book Review Service Implementation
 * =========================================================================
 * Handles the submission and retrieval of book reviews.
 * Manages both ratings (numerical) and comments (textual) for books.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class BookReviewServiceImpl implements BookReviewService {

    private final BookCommentRepository commentRepository;
    private final BookRatingRepository ratingRepository;
    private final MemberRepository memberRepository;

    /**
     * Retrieves all verified reviews (rating + comment) for a specific book.
     * 
     * @param bookId The ID of the book.
     * @return List of ReviewDTO containing user info, rating, and comment.
     */
    @Override
    public List<ReviewDTO> getReviews(Integer bookId) {
        return memberRepository.findReviewsByBookId(bookId);
    }

    /**
     * Adds or updates a user's review for a book.
     * If a review already exists for the user-book pair, it will be updated.
     * 
     * @param bookId  Target book ID.
     * @param userId  ID of the member.
     * @param rating  Rating value (1-5).
     * @param comment Review text.
     * @throws IllegalArgumentException If rating is out of bounds or comment is
     *                                  empty.
     */
    @Override
    public void addReview(
            Integer bookId,
            Integer userId,
            Integer rating,
            String comment) {

        // Validate input data
        if (rating == null || rating < 1 || rating > 5) {
            throw new ValidationException("Rating must be between 1 and 5");
        }

        if (comment == null || comment.trim().isEmpty()) {
            throw new ValidationException("Comment cannot be empty");
        }

        // 1. Create or Update Rating record
        BookRating bookRating = ratingRepository
                .findByBookIdAndUserId(bookId, userId)
                .orElseGet(BookRating::new);

        bookRating.setBookId(bookId);
        bookRating.setUserId(userId);
        bookRating.setRating(rating);

        ratingRepository.save(bookRating);

        // 2. Create or Update Comment record
        BookComment bookComment = commentRepository
                .findByBookIdAndUserId(bookId, userId)
                .orElseGet(BookComment::new);

        bookComment.setBookId(bookId);
        bookComment.setUserId(userId);
        bookComment.setComment(comment);
        bookComment.setCreatedAt(LocalDateTime.now());

        commentRepository.save(bookComment);
    }
}
