package com.project.bookstack.repositories.member;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.BookLike;

@Repository
public interface BookLikeRepository extends JpaRepository<BookLike, Integer> {

    boolean existsByUserIdAndBookId(Integer userId, Integer bookId);

    void deleteByUserIdAndBookId(Integer userId, Integer bookId);

    @Query("SELECT bl.bookId FROM BookLike bl WHERE bl.userId = :userId")
    List<Integer> findLikedBookIds(Integer userId);
    
}

