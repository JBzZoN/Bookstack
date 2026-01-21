package com.project.bookstack.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_table") // change if your table name is different
@Data
public class Dummy {
    @Id
    @Column(name = "user_id", length = 10, nullable = false)
    private String userId;

    @Column(name = "name", length = 30)
    private String name;

    @Column(name = "email", length = 30)
    private String email;

    @Column(name = "phone", length = 10)
    private String phone;

    @Column(name = "address", length = 45)
    private String address;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "username", length = 15)
    private String username;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "role_type", length = 45)
    private String roleType;
}