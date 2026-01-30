package com.project.bookstack.repositories.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.BookRating;

public interface BookRatingRepository
        extends JpaRepository<BookRating, Integer> {

    Optional<BookRating> findByBookIdAndUserId(Integer bookId, Integer userId);
}
