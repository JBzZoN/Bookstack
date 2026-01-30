package com.project.bookstack.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.bookstack.dto.UserCreateRequest;

@FeignClient(
    name = "auth-service",
    url = "http://localhost:9090"
)
public interface AuthClient {

    @PostMapping("/auth/internal/register-after-payment")
    void registerAfterPayment(@RequestBody UserCreateRequest request);
    
}
