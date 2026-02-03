package com.bookstack.auth.service;

import java.util.List;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstack.auth.client.LoggeClient;
import com.bookstack.auth.dto.AddAuthStaffDto;
import com.bookstack.auth.dto.AllEmailDto;
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
	private final LoggeClient loggeClient;

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

	public Integer registerUser(java.util.Map<String, Object> registerData) {
		User user = new User();
		String name = (String) registerData.get("name");
        if (name == null) {
            name = (String) registerData.get("fullName");
        }
		user.setName(name);
		user.setEmail((String) registerData.get("email"));
		user.setPhone((String) registerData.get("phone"));
		user.setAddress((String) registerData.get("address"));
        
        // Handle Date Parsing Safely
        Object dobObj = registerData.get("dob");
        if (dobObj != null) {
            if (dobObj instanceof String) {
               user.setDob(java.time.LocalDate.parse((String) dobObj));
            } else if (dobObj instanceof java.time.LocalDate) {
               user.setDob((java.time.LocalDate) dobObj);
            }
        }

		user.setUsername((String) registerData.get("username"));
		
        String rawPassword = (String) registerData.get("password");
        if (rawPassword == null || rawPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        
		user.setPassword(rawPassword);
		user.setRoleType("Member"); // Default role
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		User savedUser = userRepository.save(user);
		return savedUser.getUserId();
	}
	
	
	
	public String editstaff(editStaffDto editStaffDto) {
		
			
				User u=userRepository.getById(editStaffDto.getUserId());
				
				u.setName(editStaffDto.getName());
				u.setEmail(editStaffDto.getEmail());
				u.setPhone(editStaffDto.getPhone());
				u.setAddress(editStaffDto.getAddress());
				u.setUsername(editStaffDto.getUsername());
				System.out.println(editStaffDto.getPassword());
				if(editStaffDto.getPassword()!=" ") {
				String newpassword=passwordEncoder.encode(editStaffDto.getPassword());
				u.setPassword(newpassword);
				}else {
					System.out.println("namanhia");
				}
				u.setDob(editStaffDto.getDob());
				
				userRepository.save(u);
				return "saved";
				
			
		}
		

	public String savelog(LogDto logDto) {
		return loggeClient.sendlog(logDto);
	}
		
	public String changePassword(com.bookstack.auth.dto.ChangePasswordDto dto) {
		User user = userRepository.findById(dto.getUserId()).orElse(null);
		if (user == null) {
			return "User not found";
		}
		if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
			return "Invalid current password";
		}
		user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
		userRepository.save(user);
		return "Password updated successfully";
	}

	public AllEmailDto senduserdetail(User user) {
		User userdetial=userRepository.findById(user.getUserId()).get();
		AllEmailDto allEmailDto=new AllEmailDto();
		allEmailDto.setEmail(userdetial.getName());
		allEmailDto.setEmailId(userdetial.getEmail());
		return allEmailDto;
	}

}
