package com.project.bookstack.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "Member_table")
@Data
public class Member {

    /* ------------------ Shared Primary Key ------------------ */

    @Id
    @Column(name = "user_id")
    private Integer userId;

    /* ------------------ Membership Type ------------------ */

    @Column(name = "membership_type", length = 8)
    private String membershipType;

    /* ------------------ Dates ------------------ */

    @Column(name = "member_start")
    private LocalDate memberStart;

    @Column(name = "member_end")
    private LocalDate memberEnd;
}
