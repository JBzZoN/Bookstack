package com.bookstack.auth.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserCreateRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob;
    private String username;
    private String password;
}
