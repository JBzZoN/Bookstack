package com.project.bookstack.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class StaffUpdateDto {

	 private Long userId;   // identifies record

	    // user_table
	    private String name;

	    // staff_table
	    private Float salary;
	    private String status;
}
