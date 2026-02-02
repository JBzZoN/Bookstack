package com.project.bookstack.controllers;

import org.springframework.http.ResponseEntity; 


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.admin.AddStaffDto;
import com.project.bookstack.dto.admin.AllBookDto;
import com.project.bookstack.dto.admin.EditStaffDto;
import com.project.bookstack.dto.admin.UserId;
import com.project.bookstack.services.impl.admin.AdminClientService;
import com.project.bookstack.services.impl.admin.AdminServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    

	private final AdminServiceImpl adminServiceImpl;


    
	
	
	@GetMapping("/allbooks")
	public ResponseEntity<?> getAllBooks(){
		return ResponseEntity.ok(adminServiceImpl.getAllBooks());
	}
	
	
	@GetMapping("/allstaff")
	public ResponseEntity<?>getallstaff(){
		return ResponseEntity.ok(adminServiceImpl.getallstaff());
	}
	
	
	@GetMapping("/allmember")
	public ResponseEntity<?>getallmember(){
		return ResponseEntity.ok(adminServiceImpl.getallmember());
	}
	
	
	@PostMapping("/addmember")
	public ResponseEntity<?> addmember(@RequestBody AddStaffDto addStaffDto) {
		return ResponseEntity.ok(adminServiceImpl.addmember(addStaffDto));
		
	}
	
	@PostMapping("/editstaff")
	public ResponseEntity<?> addmember(@RequestBody EditStaffDto editStaffDto) {
		return ResponseEntity.ok(adminServiceImpl.editstaff(editStaffDto));
		
	}
	
	@PostMapping("/calculatefine")
	public ResponseEntity<Integer>calculatefine(@RequestBody UserId user_id){
		return ResponseEntity.ok(adminServiceImpl.calculatefine(user_id));
	}
	
	@PostMapping("/sendfine")
	public ResponseEntity<?> sendfine(@RequestBody EmailDTO emailDTO) {
		return ResponseEntity.ok(adminServiceImpl.sendfine(emailDTO));
		
	}
	
	@PostMapping("/sendfinetoall")
	public ResponseEntity<?>sendfinetoall(){
		return ResponseEntity.ok(adminServiceImpl,sendfinetoall());
	}
}

