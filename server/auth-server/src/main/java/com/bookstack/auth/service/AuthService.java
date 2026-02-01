package com.bookstack.auth.service;

import java.util.List;


import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstack.auth.client.LoggeClient;
import com.bookstack.auth.dto.AddAuthStaffDto;
import com.bookstack.auth.dto.AllStaffDto;
import com.bookstack.auth.dto.LogDto;
import com.bookstack.auth.dto.editStaffDto;
import com.bookstack.auth.entities.User;
import com.bookstack.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
	
	private final ModelMapper modelMapper;
	//private final LoggeClient loggeClient;

	public String onLogin() {
		// TODO Auto-generated method stub
		return "Hi josh welcome to bookstack";
	}

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserRepository userRepository;
	public void migratePasswordsToBCrypt() {
	    List<User> users = userRepository.findAll();

	    for (User user : users) {
	        String rawPassword = user.getPassword(); // plaintext
	        user.setPassword(passwordEncoder.encode(rawPassword));
	    }

	    userRepository.saveAll(users);
	}
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}
	public List<User> getSearchedUsers(String search) {
		// TODO Auto-generated method stub
		return userRepository.searchUsers(search, PageRequest.of(0, 5));
	}
	public List<String> getEmails() {
		// TODO Auto-generated method stub
		List<String> emails = userRepository.findAll()
									.stream()
									.map(e -> e.getEmail())
									.toList();
		return emails;
	}
	
	public List<AllStaffDto> getallstaff() {
		List<User>users= userRepository.findByRoleType("Librarian");
		return users.stream()
	            .map(user -> modelMapper.map(user, AllStaffDto.class))
	            .toList();
	}
	
	public List<AllStaffDto> getallmember() {
		List<User>users= userRepository.findByRoleType("Member");
		return users.stream()
	            .map(user -> modelMapper.map(user, AllStaffDto.class))
	            .toList();
	}
	public Integer addstaff(User user) {
		String newpassord=passwordEncoder.encode(user.getPassword());
		user.setPassword(newpassord);
		User user1=userRepository.save(user);
		return user1.getUserId();
	}
	
	
	
	public String editstaff(editStaffDto editStaffDto) {
		try {
			
			User u=userRepository.getById(editStaffDto.getUserId());
			
			u.setName(editStaffDto.getName());
			u.setEmail(editStaffDto.getEmail());
			u.setPhone(editStaffDto.getPhone());
			u.setAddress(editStaffDto.getAddress());
			u.setUsername(editStaffDto.getUsername());
			System.out.println(editStaffDto.getPassword());
			if(editStaffDto.getPassword()!=null) {
			String newpassword=passwordEncoder.encode(editStaffDto.getPassword());
			u.setPassword(newpassword);
			}else {
				System.out.println("namanhia");
			}
			u.setDob(editStaffDto.getDob());
			
			userRepository.save(u);
			return "saved";
			
		} catch (Exception e) {
			e.printStackTrace();
			return "not saved";
		}
	}
		
		public String savelog(LogDto logDto) {
			//return loggeClient.sendlog(logDto);
			return null;
		}
	

	
}
