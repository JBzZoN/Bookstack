package com.project.bookstack.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.bookstack.dto.admin.AdminDetailDto;
import com.project.bookstack.repositories.AdminRepository;
import com.project.bookstack.services.AdminService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	
private final AdminRepository adminRepository;
	
	public  List<AdminDetailDto> getAllBooks(){
		// TODO Auto-generated method stub
		return adminRepository.getAllBooks();
}
}