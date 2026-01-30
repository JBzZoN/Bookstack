package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(
    name = "book_genre",
    uniqueConstraints = @UniqueConstraint(columnNames = "genre_name")
)
@Data
public class BookGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private Integer genreId;
    
    @Column(name = "genre_name", nullable = false, length = 50)
    private String genreName;

}
