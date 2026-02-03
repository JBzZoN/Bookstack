package com.project.bookstack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    
    // Check if a PENDING notification exists for user and book
    boolean existsByUserIdAndBookIdAndStatus(Integer userId, Integer bookId, String status);

    // Find all PENDING notifications for a book
    List<Notification> findByBookIdAndStatus(Integer bookId, String status);
    
    // Find notification by user and book
    Optional<Notification> findByUserIdAndBookIdAndStatus(Integer userId, Integer bookId, String status);

    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT n.bookId FROM Notification n WHERE n.status = :status")
    List<Integer> findDistinctBookIdsByStatus(@org.springframework.data.repository.query.Param("status") String status);
}
