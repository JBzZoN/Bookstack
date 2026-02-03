package com.project.bookstack.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notification")
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Integer notificationId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "book_id")
    private Integer bookId;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private String status; // "PENDING", "SENT"

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Notification(Integer userId, Integer bookId, String email, String status) {
        this.userId = userId;
        this.bookId = bookId;
        this.email = email;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }
}
