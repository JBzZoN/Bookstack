package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_table", catalog = "authorization")
@Data
public class User {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "name")
    private String name;

    // We don't need other fields for now
}
