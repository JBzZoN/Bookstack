package com.project.bookstack.dto.admin;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ResultStaffDto {

	private Integer userId;
	private String name;
	private String email;
	private String phone;
	private String address;
	private LocalDate dob;
	private String username;

	private Float salary;
	private LocalDate dateHired;
	private String status;
}
