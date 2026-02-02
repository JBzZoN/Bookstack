package com.project.bookstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookMemberDto {
	Integer bookId;
	Integer memberId;
	Integer copyCount;
}
