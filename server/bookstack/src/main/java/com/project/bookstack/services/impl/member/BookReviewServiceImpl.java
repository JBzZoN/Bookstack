//package com.project.bookstack.services.impl.member;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.project.bookstack.dto.member.ReviewDTO;
//import com.project.bookstack.entities.BookComment;
//import com.project.bookstack.entities.BookRating;
//import com.project.bookstack.repositories.member.BookCommentRepository;
//import com.project.bookstack.repositories.member.BookRatingRepository;
//import com.project.bookstack.services.member.BookReviewService;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class BookReviewServiceImpl implements BookReviewService {
//
//    private final BookCommentRepository commentRepository;
//    private final BookRatingRepository ratingRepository;
//
//    @Override
//    public List<ReviewDTO> getReviews(Integer bookId) {
//
//        return commentRepository
//                .findByBookIdOrderByCreatedAtDesc(bookId)
//                .stream()
//                .map(c -> {
//                    Integer rating = ratingRepository
//                            .findByBookIdAndUserId(bookId, c.getUserId())
//                            .map(BookRating::getRating)
//                            .orElse(0);
//
//                    return new ReviewDto(
//                            c.getUserId(),
//                            rating,
//                            c.getComment(),
//                            c.getCreatedAt()
//                    );
//                })
//                .toList();
//    }
//
//    @Override
//    public void addReview(
//            Integer bookId,
//            Integer userId,
//            Integer rating,
//            String comment) {
//
//        // 1️⃣ Save or update rating
//        BookRating bookRating = ratingRepository
//                .findByBookIdAndUserId(bookId, userId)
//                .orElseGet(BookRating::new);
//
//        bookRating.setBookId(bookId);
//        bookRating.setUserId(userId);
//        bookRating.setRating(rating);
//
//        ratingRepository.save(bookRating);
//
//        // 2️⃣ Prevent duplicate comment
//        if (commentRepository.existsByBookIdAndUserId(bookId, userId)) {
//            throw new IllegalStateException("User already reviewed this book");
//        }
//
//        // 3️⃣ Save comment
//        BookComment bookComment = new BookComment();
//        bookComment.setBookId(bookId);
//        bookComment.setUserId(userId);
//        bookComment.setComment(comment);
//        bookComment.setCreatedAt(LocalDateTime.now());
//
//        commentRepository.save(bookComment);
//    }
//}
