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
import com.bookstack.auth.dto.ChangePasswordDto;
import com.bookstack.auth.entities.User;
import com.bookstack.auth.security.JwtUtil;
import com.bookstack.auth.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final AuthenticationManager authMgr;
	private final JwtUtil jwtUtil;
	private final IpChecking ipChecking;
	
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
	public ResponseEntity<?> onLogin(@RequestBody LoginRequest request,HttpServletRequest httpRequest) {
		try {
			// 1. Create authentication token with credentials
			Authentication authToken = new UsernamePasswordAuthenticationToken(
			request.getUsername(), request.getPassword() );
			// 2. Authenticate using AuthenticationManager
			Authentication auth = authMgr.authenticate(authToken);
			String jwt = jwtUtil.createToken(auth); // 3. Generate JWT token
	        

			// create a response dto
			User user = (User) auth.getPrincipal();
			
			if(user!=null) {
			String clientIp = IpChecking.getClientIp(httpRequest);
			LogDto logDto=new LogDto();
			logDto.setIpAddress(clientIp);
			logDto.setUserName(user.getUsername());
			logDto.setName(user.getName());
			logDto.setRoleType(user.getRoleType());
			
			authService.savelog(logDto);
			}
			else {
				String clientIp = IpChecking.getClientIp(httpRequest);
				LogDto logDto=new LogDto();
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
	
	
	@GetMapping("/allstaff")
	public ResponseEntity<List<AllStaffDto>> getallstaff() {
		return ResponseEntity.ok(authService.getallstaff());
		
	}
	
	
	@GetMapping("/allmember")
	public ResponseEntity<List<AllStaffDto>> getallmember() {
		return ResponseEntity.ok(authService.getallmember());
		
	}
	
	@PostMapping("/addstaff")
	public ResponseEntity<Integer> addstaff(@RequestBody User user){
		return ResponseEntity.ok(authService.addstaff(user));
	}

	@PostMapping("/register")
	public ResponseEntity<Integer> register(@RequestBody java.util.Map<String, Object> request) {
		return ResponseEntity.ok(authService.registerUser(request));
	}
	
	@PostMapping("/editstaff")
	public ResponseEntity<String> editstaff(@RequestBody editStaffDto editStaffDto){
		return ResponseEntity.ok(authService.editstaff(editStaffDto));
	}
	
	@PostMapping("/particularuser")
	public ResponseEntity<AllEmailDto>senduserdetail(@RequestBody User user){
		return ResponseEntity.ok(authService.senduserdetail(user));
	}
	
	@PostMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto dto) {
		String result = authService.changePassword(dto);
		if ("Password updated successfully".equals(result)) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.badRequest().body(result);
		}
	}
	
}