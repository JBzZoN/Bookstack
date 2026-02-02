package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "membership_data_table")
@Data
public class MembershipData {

    @Id
    @Column(name = "membership_type")
    private String membershipType;

    @Column(name = "rent_limit")
<<<<<<< HEAD
    private Integer rentLimit;
=======
    private Integer borrowLimit;
>>>>>>> origin/josh

    @Column(name = "borrow_period")
    private Integer borrowPeriod;

    @Column(name = "renewal_limit")
    private Integer renewalLimit;
<<<<<<< HEAD

=======
    
>>>>>>> origin/josh
    @Column(name = "monthly_cost")
    private Integer monthlyCost;

    @Column(name = "yearly_cost")
    private Integer yearlyCost;
   
}


