package com.project.bookstack.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User DTO
 * =========================================================================
 * Comprehensive user profile including authentication and membership details.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Integer userId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob;
    private String username;
    private String roleType;
    private String membershipType;
    private LocalDate memberStart;
    private LocalDate memberEnd;
}