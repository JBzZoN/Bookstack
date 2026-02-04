package com.project.bookstack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    // Check if a PENDING notification exists for user and book
    boolean existsByUserIdAndBookId(Integer userId, Integer bookId);

    // Find all PENDING notifications for a book
    List<Notification> findByBookId(Integer bookId);

    // Find notification by user and book
    Optional<Notification> findByUserIdAndBookId(Integer userId, Integer bookId);

    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT n.bookId FROM Notification n")
    List<Integer> findDistinctBookIds();
}
