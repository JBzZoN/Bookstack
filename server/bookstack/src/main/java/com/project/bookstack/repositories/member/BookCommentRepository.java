package com.project.bookstack.repositories.member;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.BookComment;

public interface BookCommentRepository
        extends JpaRepository<BookComment, Integer> {

	 Optional<BookComment> findByBookIdAndUserId(Integer bookId, Integer userId);
	
}
