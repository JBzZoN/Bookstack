package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

/**
 * Member Entity
 * =========================================================================
 * Represents a library patron (member) and their subscription details.
 * Tracks membership duration, plan type, and usage statistics.
 */
@Entity
@Table(name = "member_table")
@Data
public class Member {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    /* ------------------ Membership Type ------------------ */

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
        name = "membership_type",
        referencedColumnName = "membership_type",
        foreignKey = @ForeignKey(name = "membership_type")
    )
    private MembershipData membershipData;

    @Column(name = "member_start")
    private LocalDate memberStart;

    @Column(name = "member_end")
    private LocalDate memberEnd;
    
    @Column(name = "rent_count")
    private Integer rentCount;
    
    @Column(name = "renew_count")
    private Integer renewCount;
    
}
