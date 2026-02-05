package com.bookstack.messaging.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "book_notify")
public class BookNotify {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookId;
    private String email;
    private boolean notified;

    public Long getId() { return id; }
    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public boolean isNotified() { return notified; }
    public void setNotified(boolean notified) { this.notified = notified; }
}
