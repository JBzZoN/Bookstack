package com.project.bookstack.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "book_genre")
@Data
public class BookGenreMapping {

    @EmbeddedId
    private BookGenreMappingId id;
    
    @Embeddable
    public static class BookGenreMappingId implements Serializable {

        @Column(name = "book_id")
        private Integer bookId;

        @Column(name = "genre_id")
        private Integer genreId;

    }
}
