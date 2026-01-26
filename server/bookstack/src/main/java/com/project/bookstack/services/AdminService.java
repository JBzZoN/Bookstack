package com.project.bookstack.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.bookstack.dto.AdminDetailDto;
import com.project.bookstack.repositories.AdminRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@Setter
@Getter
@AllArgsConstructor
public class AdminService {

	private final AdminRepository adminRepository;
	
	public  List<AdminDetailDto> getAllBooks(){
		// TODO Auto-generated method stub
		return adminRepository.getAllBooks();
	}

}
