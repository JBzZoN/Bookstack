package com.bookstack.auth.client;

//import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.bookstack.auth.dto.LogDto;



@Service
//@FeignClient(name="admin-auth-coonect",url="http://localhost:5020")
public interface LoggeClient {

	@PostMapping("logs")
	public String sendlog(LogDto logDto);
}
