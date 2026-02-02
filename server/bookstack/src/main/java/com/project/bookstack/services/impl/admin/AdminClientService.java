package com.project.bookstack.services.impl.admin;

import java.util.List;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.project.bookstack.dto.admin.AddAuthStaffDto;
import com.project.bookstack.dto.admin.AllBookDto;
import com.project.bookstack.dto.admin.AllStaffDto;
import com.project.bookstack.dto.admin.EditStaffSentDto;

@Service
@FeignClient(name="admin-auth-coonect",url="http://localhost:9090")
public interface AdminClientService {

	@GetMapping("/auth/allstaff")
	public List<AllStaffDto>getAllStaff();
	
	@GetMapping("/auth/allmember")
	public List<AllStaffDto>getAllmember();
	
	@PostMapping("/auth/addstaff")
	public Integer addstaff(AddAuthStaffDto addAuthStaffDto);
	
	
	@PostMapping("/auth/editstaff")
	 public String editstaff(EditStaffSentDto editStaffSentDto);
}

