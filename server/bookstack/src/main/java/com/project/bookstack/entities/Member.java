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
<<<<<<< HEAD

    @Column(name = "membership_type", length = 8)
    private String membershipType;
=======
    /* ------------------ Membership Type ------------------ */

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
        name = "membership_type",
        referencedColumnName = "membership_type",
        foreignKey = @ForeignKey(name = "membership_type")
    )
    private MembershipData membershipData;
>>>>>>> origin/josh

    @Column(name = "member_start")
    private LocalDate memberStart;

    @Column(name = "member_end")
    private LocalDate memberEnd;
<<<<<<< HEAD

    @Column(name = "renew_count", nullable = false)
    private Integer renewCount = 0;

    @Column(name = "rent_count", nullable = false)
    private Integer rentCount = 0;
=======
    
    @Column(name = "rent_count")
    private Integer rentCount;
    
    @Column(name = "renew_count")
    private Integer renewCount;
    
>>>>>>> origin/josh
}
