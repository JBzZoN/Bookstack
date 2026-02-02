package com.bookstack.auth.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class AddAuthStaffDto {

	
	private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob;          // Date of Birth
    private String username;
    private String password;
    private String roleType; 
}
