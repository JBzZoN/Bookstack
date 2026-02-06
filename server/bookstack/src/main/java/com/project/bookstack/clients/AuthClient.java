package com.project.bookstack.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(
    name = "auth-service",
    url = "http://auth-server:9090"   
)
public interface AuthClient {

    @PostMapping("auth/register")  
    Integer createUser(@RequestBody Map<String, Object> registerData);
    
}