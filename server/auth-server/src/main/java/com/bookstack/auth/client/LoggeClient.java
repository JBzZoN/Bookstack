package com.bookstack.auth.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.bookstack.auth.dto.LogDto;

/**
 * Logger Service Client
 * =========================================================================
 * Feign client for communicating with the external Logger Service.
 * Used to centralize authentication audit logs across the platform.
 */
@Service
@FeignClient(name = "admin-auth-coonect", url = "http://localhost:5020")
public interface LoggeClient {

	/**
	 * Sends an authentication log entry to the Logger Service.
	 * 
	 * @param logDto DTO containing IP, user details, and event type.
	 * @return Confirmation message from the Logger service.
	 */
	@PostMapping("logs")
	public String sendlog(LogDto logDto);
}
