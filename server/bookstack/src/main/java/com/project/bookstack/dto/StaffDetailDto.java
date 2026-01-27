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
public class StaffDetailDto {

    private Integer user_id;
    private String name;
    private Float salary;
    private String phone;
    private String status;
}
