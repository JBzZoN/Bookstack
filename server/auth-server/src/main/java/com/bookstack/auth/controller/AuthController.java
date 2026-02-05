package com.bookstack.auth.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstack.auth.config.IpChecking;
import com.bookstack.auth.dto.AddAuthStaffDto;
import com.bookstack.auth.dto.AllEmailDto;
import com.bookstack.auth.dto.AllStaffDto;
import com.bookstack.auth.dto.LogDto;
import com.bookstack.auth.dto.LoginRequest;
import com.bookstack.auth.dto.UserResponseDTO;
import com.bookstack.auth.dto.editStaffDto;
import com.bookstack.auth.entities.User;
import com.bookstack.auth.security.JwtUtil;
import com.bookstack.auth.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

/**
 * Authentication Controller
 * ==========================================================================
 * Centralized entry point for authentication and user management operations.
 * 
 * Core Responsibilities:
 * - Handling User Login and JWT issuance.
 * - Managing Staff and Member account interactions.
 * - Facilitating user search and retrieval.
 * - Logging authentication attempts (audit trail).
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final AuthenticationManager authMgr;
	private final JwtUtil jwtUtil;
	private final IpChecking ipChecking;

	/**
	 * Retrieves all registered users.
	 * 
	 * @return List of all User entities.
	 */
	@GetMapping("/users")
	public List<User> getString() {
		return authService.findAll();
	}

	/**
	 * Retrieves all user emails.
	 * 
	 * @return List of email strings.
	 */
	@GetMapping("/email")
	public List<String> getEmails() {
		return authService.getEmails();
	}

	/**
	 * Search for users based on a query string.
	 * 
	 * @param search The search query (matches name, email, etc.)
	 * @return List of matching User entities.
	 */
	@PostMapping("/search/users")
	public List<User> getUsers(@RequestParam String search) {
		return authService.getSearchedUsers(search);
	}

	/**
	 * Handles User Login.
	 * - Authenticates credentials via AuthenticationManager.
	 * - Generates a JWT token upon success.
	 * - Logs the login attempt with client IP information.
	 * 
	 * @param request     Login credentials (username, password).
	 * @param httpRequest The HTTP servlet request for IP extraction.
	 * @return ResponseEntity with JWT and user details, or 401 on failure.
	 */
	@PostMapping("/login")
	public ResponseEntity<?> onLogin(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
		try {
			// 1. Create authentication token with credentials
			Authentication authToken = new UsernamePasswordAuthenticationToken(
					request.getUsername(), request.getPassword());
			// 2. Authenticate using AuthenticationManager
			Authentication auth = authMgr.authenticate(authToken);
			String jwt = jwtUtil.createToken(auth); // 3. Generate JWT token

			// create a response dto
			User user = (User) auth.getPrincipal();

			if (user != null) {
				String clientIp = IpChecking.getClientIp(httpRequest);
				LogDto logDto = new LogDto();
				logDto.setIpAddress(clientIp);
				logDto.setUserName(user.getUsername());
				logDto.setName(user.getName());
				logDto.setRoleType(user.getRoleType());

				authService.savelog(logDto);
			} else {
				String clientIp = IpChecking.getClientIp(httpRequest);
				LogDto logDto = new LogDto();
				logDto.setIpAddress(clientIp);
				logDto.setUserName(request.getUsername());
				logDto.setName("invalid userid or password");
				logDto.setRoleType("none");

				authService.savelog(logDto);
			}
			UserResponseDTO result = UserResponseDTO.builder()
					.email(user.getEmail())
					.name(user.getName())
					.role(user.getRoleType())
					.token(jwt)
					.userId(user.getUserId())
					.username(user.getUsername())
					.build();
			return ResponseEntity.ok(result); // 4. Return token
		} catch (AuthenticationException e) {

			return ResponseEntity.status(401).body("Invalid credentials");
		}
	}

	/**
	 * Staff roles test endpoint.
	 */
	@GetMapping("/librarian")
	public String one() {
		return "I am a librarian";
	}

	/**
	 * Admin roles test endpoint.
	 */
	@GetMapping("/admin")
	public String two() {
		return "I am an admin";
	}

	/**
	 * Member roles test endpoint.
	 */
	@GetMapping("/member")
	public String three() {
		return "I am a member";
	}

	/**
	 * Maintenance endpoint to migrate plaintext passwords to BCrypt.
	 */
	@GetMapping("/bcrypt")
	public void bcrypt() {
		authService.migratePasswordsToBCrypt();
	}

	/**
	 * Retrieves all staff members.
	 * 
	 * @return List of staff-specific DTOs.
	 */
	@GetMapping("/allstaff")
	public ResponseEntity<List<AllStaffDto>> getallstaff() {
		return ResponseEntity.ok(authService.getallstaff());

	}

	/**
	 * Retrieves all regular library members.
	 * 
	 * @return List of member-specific DTOs.
	 */
	@GetMapping("/allmember")
	public ResponseEntity<List<AllStaffDto>> getallmember() {
		return ResponseEntity.ok(authService.getallmember());

	}

	/**
	 * Privileged operation to add a new staff member.
	 * 
	 * @param user The user object containing staff details.
	 * @return The ID of the newly created staff user.
	 */
	@PostMapping("/addstaff")
	public ResponseEntity<Integer> addstaff(@RequestBody User user) {
		return ResponseEntity.ok(authService.addstaff(user));
	}

	/**
	 * Updates existing staff member details.
	 * 
	 * @param editStaffDto DTO containing updated staff info.
	 * @return Success/Failure message.
	 */
	@PostMapping("/editstaff")
	public ResponseEntity<String> editstaff(@RequestBody editStaffDto editStaffDto) {
		return ResponseEntity.ok(authService.editstaff(editStaffDto));
	}

	/**
	 * Retrieves full details for a specific user.
	 * 
	 * @param user User object (typically containing userId or username).
	 * @return DTO with comprehensive user information.
	 */
	@PostMapping("/particularuser")
	public ResponseEntity<AllEmailDto> senduserdetail(@RequestBody User user) {
		return ResponseEntity.ok(authService.senduserdetail(user));
	}

}
