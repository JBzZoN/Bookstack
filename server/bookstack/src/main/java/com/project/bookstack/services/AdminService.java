package com.project.bookstack.services;

import java.util.List
;



import org.springframework.stereotype.Service;

import com.project.bookstack.dto.admin.AddStaffDto;
import com.project.bookstack.dto.admin.AdminDetailDto;
import com.project.bookstack.dto.admin.AllBookDto;
import com.project.bookstack.dto.admin.AllStaffDto;
import com.project.bookstack.dto.admin.EditStaffDto;
import com.project.bookstack.dto.admin.ResultMemberDto;
import com.project.bookstack.dto.admin.ResultStaffDto;
import com.project.bookstack.dto.admin.UserId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


public interface AdminService {

	public List<AllBookDto> getAllBooks();
	
	public List<ResultStaffDto> getallstaff();
	
	public List<ResultMemberDto> getallmember();
	
	public String addmember(AddStaffDto addStaffDto);
	
	public String editstaff(EditStaffDto editStaffDto);
	
	public Integer calculatefine(UserId user_id);
	}


