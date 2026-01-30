package com.project.bookstack.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "member_book_table")
public class MemberBook {

    @EmbeddedId
    private MemberBookId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bookId")
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "copy_count")
    private Integer copyCount;

    public MemberBook() {}

    // getters & setters
    public MemberBookId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Book getBook() {
        return book;
    }

    public Integer getCopyCount() {
        return copyCount;
    }
}
