package com.bookstack.auth.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstack.auth.dto.LoginRequest;
import com.bookstack.auth.dto.UserCreateRequestDTO;
import com.bookstack.auth.dto.UserResponseDTO;
import com.bookstack.auth.entities.User;
import com.bookstack.auth.security.JwtUtil;
import com.bookstack.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;

	private final AuthService authService;
	private final AuthenticationManager authMgr;
	private final JwtUtil jwtUtil;

	@GetMapping("/users")
	public List<User> getString() {
		return authService.findAll();
	}
	
	@GetMapping("/email")
	public List<String> getEmails() {
		return authService.getEmails();
	}
	
	@PostMapping("/search/users")
	public List<User> getUsers(@RequestParam String search) {
		return authService.getSearchedUsers(search);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> onLogin(@RequestBody LoginRequest request) {
		try {
			// 1. Create authentication token with credentials
			Authentication authToken = new UsernamePasswordAuthenticationToken(
			request.getUsername(), request.getPassword() );
			// 2. Authenticate using AuthenticationManager
			Authentication auth = authMgr.authenticate(authToken);
			String jwt = jwtUtil.createToken(auth); // 3. Generate JWT token
			
			// create a response dto
			User user = (User) auth.getPrincipal();
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
	
	@GetMapping("/librarian")
	public String one() {
		return "I am a librarian";
	}
	
	@GetMapping("/admin")
	public String two() {
		return "I am an admin";
	}
	
	@GetMapping("/member")
	public String three() {
		return "I am a member";
	}
	
	@GetMapping("/bcrypt")
	public void bcrypt() {
		authService.migratePasswordsToBCrypt();
	}
	
	@PostMapping("/register")
    public Integer registerAfterPayment(
            @RequestBody UserCreateRequestDTO request) {

        if (authService.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }

        if (authService.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setAddress(request.address());
        user.setDob(request.dob());
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoleType("Member");

        User savedUser = authService.save(user);

        return savedUser.getUserId();
    }
	
}
