package com.project.bookstack.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.bookstack.dto.BookCopyCountDto;

@FeignClient(name = "book-service", url = "http://localhost:4000")
public interface BookClient {

	@GetMapping("/book/copy")
	public Integer getCopies(@RequestParam Integer bookId);
	
	@PutMapping("/book/id")
	public void modifyCount(@RequestBody BookCopyCountDto bookCopyCountDto);
	
}
