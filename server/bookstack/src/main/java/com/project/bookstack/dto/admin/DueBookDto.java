package com.project.bookstack.dto.admin;

import java.time.LocalDate;


import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@RequiredArgsConstructor
public class DueBookDto {

	private Integer totalCopies;
    private LocalDate dueDate;
    
    public DueBookDto(Integer totalCopies, LocalDate dueDate) {
        this.totalCopies = totalCopies;
        this.dueDate = dueDate;
    }
}
