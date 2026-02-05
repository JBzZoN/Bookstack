package com.project.bookstack.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * Book Genre Mapping Entity
 * =========================================================================
 * Represents the many-to-many relationship between Books and Genres.
 * Uses an embedded composite key to link bookId and genreId.
 */
@Entity
@Table(name = "book_genre")
@Data
public class BookGenreMapping {

    @EmbeddedId
    private BookGenreMappingId id;
    
    @Embeddable
    @Data
    @EqualsAndHashCode
    public static class BookGenreMappingId implements Serializable {

        @Column(name = "book_id")
        private Integer bookId;

        @Column(name = "genre_id")
        private Integer genreId;

    }
}
