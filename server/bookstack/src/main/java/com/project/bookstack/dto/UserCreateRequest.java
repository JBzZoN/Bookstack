package com.project.bookstack.dto;

import java.time.LocalDate;

import lombok.Data;

/**
 * User Create Request DTO
 * =========================================================================
 * Used for member registration requests during the signup process.
 * Contains all necessary user profile information needed to create a new member
 * account.
 */
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
