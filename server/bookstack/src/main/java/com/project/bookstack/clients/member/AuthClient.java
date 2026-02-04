package com.project.bookstack.clients.member;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "auth-service", url = "http://localhost:9090")
public interface AuthClient {

    @PostMapping("auth/register")
    Integer createUser(@RequestBody Map<String, Object> registerData);

    @PostMapping("auth/particularuser")
    com.project.bookstack.dto.EmailDTO getUserDetail(@RequestBody Map<String, Object> user);

}