package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.bookstack.entities.BookNotify;

/**
 * Book Notify Repository
 * =========================================================================
 * Manages notification requests for out-of-stock books.
 */
public interface BookNotifyRepository extends JpaRepository<BookNotify, Long> {

        boolean existsByBookIdAndEmail(Long bookId, String email);
}
