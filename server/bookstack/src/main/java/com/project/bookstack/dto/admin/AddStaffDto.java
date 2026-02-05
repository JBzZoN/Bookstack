package com.project.bookstack.dto.admin;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddStaffDto {

    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob; // Date of Birth
    private String username;
    private String password;
    private String roleType; // Librarian / Admin
    private float salary;
    private LocalDate dateHired;
    private String status;
}
