package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "membership_data_table")
@Data
public class MembershipData {

    @Id
    @Column(name = "membership_type", length = 8)
    private String membershipType;

    @Column(name = "borrow_limit")
    private Integer borrowLimit;

    @Column(name = "borrow_period")
    private Integer borrowPeriod;

    @Column(name = "renewal_limit")
    private Integer renewalLimit;

    @Column(name = "reservation_limit")
    private Integer reservationLimit;

    @Column(name = "access_to_new")
    private Boolean accessToNew;

    @Column(name = "monthly_cost")
    private Integer monthlyCost;

    @Column(name = "yearly_cost")
    private Integer yearlyCost;
}
