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
@Table(name = "notification_table")
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer notificationId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "book_id")
    private Integer bookId;

    @Column(name = "email")
    private String email;

    @Column(name = "requested_at")
    private LocalDateTime requestedAt = LocalDateTime.now();

    public Notification(Integer userId, Integer bookId, String email) {
        this.userId = userId;
        this.bookId = bookId;
        this.email = email;
        this.requestedAt = LocalDateTime.now();
    }
}
