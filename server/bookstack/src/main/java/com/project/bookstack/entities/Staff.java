package com.project.bookstack.entities;



import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "staff_table", schema = "Bookstack")
public class Staff {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "user_id",
        foreignKey = @ForeignKey(name = "staff_user")
    )
    private User user;

    @Column(name = "salary")
    private Float salary;

    @Column(name = "date_hired")
    private LocalDate dateHired;
    
    @Column(name = "status",length = 10)
    private String status;
}

    /* ------------------ Constructors ------------------ */

 
