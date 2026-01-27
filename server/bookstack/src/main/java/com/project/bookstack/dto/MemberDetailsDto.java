package com.project.bookstack.dto;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDetailsDto {

    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob;
    private String username;

    private String membershipType;
    private LocalDate memberStart;
    private LocalDate memberEnd;
}