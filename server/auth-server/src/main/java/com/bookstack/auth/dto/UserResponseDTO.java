package com.bookstack.auth.dto;

import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserResponseDTO {

    private Integer userId;
    private String username;
    private String name;
    private String email;
    private String role;
    private String token;
    
}


