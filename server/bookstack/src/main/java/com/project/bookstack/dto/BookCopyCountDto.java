package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookCopyCountDto {
	Integer bookId;
	Integer noOfCopiesRemaining;
}
