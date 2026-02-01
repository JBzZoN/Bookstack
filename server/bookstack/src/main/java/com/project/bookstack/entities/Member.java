package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "member_table")
@Data
public class Member {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "membership_type", length = 8)
    private String membershipType;

    @Column(name = "member_start")
    private LocalDate memberStart;

    @Column(name = "member_end")
    private LocalDate memberEnd;

    @Column(name = "renew_count", nullable = false)
    private Integer renewCount = 0;

    @Column(name = "rent_count", nullable = false)
    private Integer rentCount = 0;
}
