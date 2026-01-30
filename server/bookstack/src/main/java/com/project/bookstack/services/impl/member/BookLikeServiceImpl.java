package com.project.bookstack.services.impl.member;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.bookstack.entities.BookLike;
import com.project.bookstack.repositories.member.BookLikeRepository;
import com.project.bookstack.services.member.BookLikeService;

@Service
@Transactional
public class BookLikeServiceImpl implements BookLikeService {

    private final BookLikeRepository bookLikeRepository;

    public BookLikeServiceImpl(BookLikeRepository bookLikeRepository) {
        this.bookLikeRepository = bookLikeRepository;
    }

    /* =========================
       Get all liked books
       ========================= */
    @Override
    public List<Integer> getLikedBooks(Integer userId) {
        return bookLikeRepository.findLikedBookIds(userId);
    }

    /* =========================
       Toggle like / unlike
       ========================= */
    @Override
    public boolean toggleLike(Integer userId, Integer bookId) {

        boolean alreadyLiked =
                bookLikeRepository.existsByUserIdAndBookId(userId, bookId);

        if (alreadyLiked) {
            // UNLIKE
            bookLikeRepository.deleteByUserIdAndBookId(userId, bookId);
            return false;
        } else {
            // LIKE
            BookLike like = new BookLike();
            like.setUserId(userId);
            like.setBookId(bookId);

            bookLikeRepository.save(like);
            return true;
        }
    }
}
