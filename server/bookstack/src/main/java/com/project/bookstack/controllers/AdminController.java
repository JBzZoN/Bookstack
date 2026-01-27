package com.project.bookstack.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.MemberDetailsDto;
import com.project.bookstack.dto.StaffUpdateDto;
import com.project.bookstack.dto.StaffUserDto;
import com.project.bookstack.services.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminController {

	private final AdminService adminService;
	
	@GetMapping("/books")
	public ResponseEntity<?> getAllBooks(){
		ResponseEntity<?> responseEntity = ResponseEntity.ok(adminService.getAllBooks());
		return responseEntity;
	}
	
	@GetMapping("/staff")
	public ResponseEntity<?>getAllStaff(){
		ResponseEntity<?>responseEntity=ResponseEntity.ok(adminService.getallstaff());
		return responseEntity;
	}
	
	
	@PostMapping("/staff/add")
	public ResponseEntity<String> addStaff(
	        @RequestBody StaffUserDto dto) {

	    adminService.saveStaffUser(dto);
	    return ResponseEntity.ok("Staff added successfully");
	}
	
	@PutMapping("/staff/update")
	public ResponseEntity<String> updateStaff(
	        @RequestBody StaffUpdateDto dto) {

	    adminService.updateStaffUser(dto);
	    return ResponseEntity.ok("Staff details updated successfully");
	}
	
	
	@GetMapping("/members")
	public ResponseEntity<List<MemberDetailsDto>> getAllMembers() {
	    return ResponseEntity.ok(adminService.getAllMembers());
	}
}
