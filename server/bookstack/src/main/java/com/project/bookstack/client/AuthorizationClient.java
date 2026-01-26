package com.project.bookstack.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.bookstack.dto.UserDTO;

@FeignClient(value="authorization", url = "http://localhost:9090")
public interface AuthorizationClient {

	@GetMapping("/auth/users")
	List<UserDTO> getUsers();
	
	@PostMapping("/auth/search/users")
	List<UserDTO> getSearchedUsers(@RequestParam String search);
	
}
