package com.project.bookstack.services.impl.member;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.entities.BookComment;
import com.project.bookstack.entities.BookRating;
import com.project.bookstack.repositories.member.BookCommentRepository;
import com.project.bookstack.repositories.member.BookRatingRepository;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.member.BookReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookReviewServiceImpl implements BookReviewService {

    private final BookCommentRepository commentRepository;
    private final BookRatingRepository ratingRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<ReviewDTO> getReviews(Integer bookId) {
        return memberRepository.findReviewsByBookId(bookId);
    }


    @Override
    public void addReview(
            Integer bookId,
            Integer userId,
            Integer rating,
            String comment) {

        // ✅ VALIDATION (MANDATORY)
        if (rating == null || rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        if (comment == null || comment.trim().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty");
        }

        // ✅ RATING: CREATE OR UPDATE
        BookRating bookRating = ratingRepository
                .findByBookIdAndUserId(bookId, userId)
                .orElseGet(BookRating::new);

        bookRating.setBookId(bookId);
        bookRating.setUserId(userId);
        bookRating.setRating(rating);

        ratingRepository.save(bookRating);

        // ✅ COMMENT: CREATE OR UPDATE
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

