package com.project.bookstack.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffUserDto {

	 private String name;
	    private String email;
	    private String phone;
	    private String address;
	    private LocalDate dob;
	    private String username;
	    private String password;
	    private String roleType;

	    // staff_table fields
	    private Float salary;
	    private LocalDate dateHired;
	    private String status;
}
