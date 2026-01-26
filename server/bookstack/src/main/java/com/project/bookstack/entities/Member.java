package com.project.bookstack.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "Member_table", schema = "Bookstack")
@Data
public class Member {

    /* ------------------ Shared Primary Key ------------------ */

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

    /* ------------------ Dates ------------------ */

    @Column(name = "member_start")
    private LocalDate memberStart;

    @Column(name = "member_end")
    private LocalDate memberEnd;
}
