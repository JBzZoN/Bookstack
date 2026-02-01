package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member_book_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberBook {

    @EmbeddedId
    private MemberBookId id;

    @Column(name = "copy_count")
    private Integer copyCount;

}