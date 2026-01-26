package com.bookstack.auth.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstack.auth.entities.User;
import com.bookstack.auth.repository.UserRepository;

@Service
@Transactional
public class AuthService {

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
	
}
