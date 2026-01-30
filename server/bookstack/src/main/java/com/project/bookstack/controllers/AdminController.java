package com.project.bookstack.controllers;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.services.impl.AdminServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AdminController {

	private final AdminServiceImpl adminServiceImpl;
	
	@GetMapping("/books")
	public ResponseEntity<?> getAllBooks(){
		ResponseEntity<?> responseEntity = ResponseEntity.ok("ohk");
		return responseEntity;
	}
}
