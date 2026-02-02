package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "staff_table", schema = "Bookstack")
@Data
@Getter
@Setter
public class Staff {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "salary")
    private Float salary;

    @Column(name = "date_hired")
    private LocalDate dateHired;
    
    @Column(name = "status",length = 10)
    private String status;
}

    
 
