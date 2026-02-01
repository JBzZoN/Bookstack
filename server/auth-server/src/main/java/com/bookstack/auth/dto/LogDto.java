package com.bookstack.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class LogDto {

	private String UserName;
    private String RoleType;
    private String Name;
    private String IpAddress;
}
