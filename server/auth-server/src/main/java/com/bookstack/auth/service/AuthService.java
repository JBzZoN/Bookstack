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

/**
 * Authentication Service
 * ==========================================================================
 * Provides business logic for authentication, authorization, and user account
 * management. Interacts directly with the UserRepository and external logger
 * service.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

	private final ModelMapper modelMapper;
	private final LoggeClient loggeClient;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

	/**
	 * Maintenance method to migrate plaintext passwords in the database
	 * to secure BCrypt hashes.
	 */
	public void migratePasswordsToBCrypt() {
		List<User> users = userRepository.findAll();

		for (User user : users) {
			String rawPassword = user.getPassword(); // plaintext
			user.setPassword(passwordEncoder.encode(rawPassword));
		}

		userRepository.saveAll(users);
	}

	/**
	 * Retrieves all registered users in the system.
	 * 
	 * @return List of all User entities.
	 */
	public List<User> findAll() {
		return userRepository.findAll();
	}

	/**
	 * Performs a paginated search for users matching a specific query string.
	 * 
	 * @param search The search query.
	 * @return List of matching users (limited to top 5 results).
	 */
	public List<User> getSearchedUsers(String search) {
		return userRepository.searchUsers(search, PageRequest.of(0, 5));
	}

	/**
	 * Extracts all unique user emails from the database.
	 * 
	 * @return List of email addresses.
	 */
	public List<String> getEmails() {
		return userRepository.findAll()
				.stream()
				.map(e -> e.getEmail())
				.toList();
	}

	/**
	 * Filters and retrieves all users with the 'Librarian' role.
	 * 
	 * @return List of staff DTOs.
	 */
	public List<AllStaffDto> getallstaff() {
		List<User> users = userRepository.findByRoleType("Librarian");
		return users.stream()
				.map(user -> modelMapper.map(user, AllStaffDto.class))
				.toList();
	}

	/**
	 * Filters and retrieves all users with the 'Member' role.
	 * 
	 * @return List of member DTOs.
	 */
	public List<AllStaffDto> getallmember() {
		List<User> users = userRepository.findByRoleType("Member");
		return users.stream()
				.map(user -> modelMapper.map(user, AllStaffDto.class))
				.toList();
	}

	/**
	 * Registers a new staff member with an encoded password.
	 * 
	 * @param user The user object to persist.
	 * @return The generated unique ID for the new user.
	 */
	public Integer addstaff(User user) {
		String newpassord = passwordEncoder.encode(user.getPassword());
		user.setPassword(newpassord);
		User user1 = userRepository.save(user);
		return user1.getUserId();
	}

	/**
	 * Updates an existing staff member's profile details.
	 * Handles optional password updates (only updates if a non-empty string is
	 * provided).
	 * 
	 * @param editStaffDto DTO with updated information.
	 * @return Status string ("saved" or "not saved").
	 */
	public String editstaff(editStaffDto editStaffDto) {
		try {
			User u = userRepository.getById(editStaffDto.getUserId());

			u.setName(editStaffDto.getName());
			u.setEmail(editStaffDto.getEmail());
			u.setPhone(editStaffDto.getPhone());
			u.setAddress(editStaffDto.getAddress());
			u.setUsername(editStaffDto.getUsername());

			// Conditional password update
			if (editStaffDto.getPassword() != null && !editStaffDto.getPassword().trim().isEmpty()) {
				String newpassword = passwordEncoder.encode(editStaffDto.getPassword());
				u.setPassword(newpassword);
			}

			u.setDob(editStaffDto.getDob());
			userRepository.save(u);
			return "saved";

		} catch (Exception e) {
			e.printStackTrace();
			return "not saved";
		}
	}

	/**
	 * Forwards an authentication log entry to the external Logger Service.
	 * 
	 * @param logDto The log data (IP, Username, etc.)
	 * @return Success/Failure response from the Feign client.
	 */
	public String savelog(LogDto logDto) {
		return loggeClient.sendlog(logDto);
	}

	/**
	 * Retrieves basic identification details for a specific user ID.
	 * 
	 * @param user User object containing the ID to search for.
	 * @return DTO with user name and email.
	 */
	public AllEmailDto senduserdetail(User user) {
		User userdetial = userRepository.findById(user.getUserId()).get();
		AllEmailDto allEmailDto = new AllEmailDto();
		allEmailDto.setEmail(userdetial.getName());
		allEmailDto.setEmailId(userdetial.getEmail());
		return allEmailDto;
	}
}
