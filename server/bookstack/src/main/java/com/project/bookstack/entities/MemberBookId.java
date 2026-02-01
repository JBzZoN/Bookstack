package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
@Embeddable
public class MemberBookId implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "book_id")
    private Integer bookId;

    public MemberBookId() {}

    public MemberBookId(Integer userId, Integer bookId) {
        this.userId = userId;
        this.bookId = bookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MemberBookId)) return false;
        MemberBookId that = (MemberBookId) o;
        return Objects.equals(userId, that.userId)
                && Objects.equals(bookId, that.bookId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, bookId);
    }
}
