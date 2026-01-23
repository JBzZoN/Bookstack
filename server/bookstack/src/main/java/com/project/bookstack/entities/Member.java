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

    @MapsId
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "user_id",
        foreignKey = @ForeignKey(name = "member_user")
    )
    private User user;

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
