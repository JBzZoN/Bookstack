package com.project.bookstack.services.impl.member;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.bookstack.entities.BookLike;
import com.project.bookstack.repositories.member.BookLikeRepository;
import com.project.bookstack.services.member.BookLikeService;

import lombok.RequiredArgsConstructor;

/**
 * Book Like Service Implementation
 * =========================================================================
 * Manages the social 'like' interactions for books.
 * Supports retrieving a user's liked collection and toggling like status.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class BookLikeServiceImpl implements BookLikeService {

    private final BookLikeRepository bookLikeRepository;

    /**
     * Retrieves the IDs of all books liked by a specific user.
     * 
     * @param userId The ID of the member.
     * @return List of book IDs.
     */
    @Override
    public List<Integer> getLikedBooks(Integer userId) {
        return bookLikeRepository.findLikedBookIds(userId);
    }

    /**
     * Toggles the like status of a book for a user.
     * If already liked, it will be removed (unliked).
     * If not liked, a new record will be created.
     * 
     * @param userId The ID of the member.
     * @param bookId The ID of the book.
     * @return True if the book is now liked, false if unliked.
     */
    @Override
    public boolean toggleLike(Integer userId, Integer bookId) {

        boolean alreadyLiked = bookLikeRepository.existsByUserIdAndBookId(userId, bookId);

        if (alreadyLiked) {
            bookLikeRepository.deleteByUserIdAndBookId(userId, bookId);
            return false;
        } else {
            BookLike like = new BookLike();
            like.setUserId(userId);
            like.setBookId(bookId);

            bookLikeRepository.save(like);
            return true;
        }
    }
}
