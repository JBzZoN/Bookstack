package com.bookstack.auth.dto;

import java.time.LocalDate;

public record UserCreateRequestDTO (
   	String name,
    String email,
    String phone,
    String address,
    LocalDate dob,
    String username,
    String password
) {}
