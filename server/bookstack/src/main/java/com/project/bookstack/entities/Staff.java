package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Staff Entity
 * =========================================================================
 * Represents a library employee (Admins, Librarians).
 * Stores employment-specific data like salary, hiring date, and system status.
 */
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

    @Column(name = "status", length = 10)
    private String status;
}
