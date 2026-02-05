package com.bookstack.messaging.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstack.messaging.entity.BookNotify;

public interface BookNotifyRepository
        extends JpaRepository<BookNotify, Long> {

    List<BookNotify> findByBookId(Long bookId);
}
