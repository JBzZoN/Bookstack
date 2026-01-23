package com.project.bookstack.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookWithImageDto;
import com.project.bookstack.entities.Book;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.User;
import com.project.bookstack.services.StaffService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/staff")
@RequiredArgsConstructor
@RestController
@CrossOrigin
public class StaffController {
	
	public final StaffService staffService;
	
	// BOOKS RELATED
	
	@GetMapping("/books")
	public List<BookDto> getAllBooks() {
		return staffService.getAllBooks();
	}
	
	@GetMapping("/members")
	public List<Member> getAllMembers() {
		return staffService.getAllMembers();
	}
	
	@GetMapping("/book/{id}")
	public List<String> getGenre(@PathVariable Integer id) {
		return staffService.getGenre(id);
	}
	
	

	
	@PostMapping(value = "/book", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public List<Member> addBook(@ModelAttribute BookWithImageDto bookWithImageDto) {
		return staffService.addBook(bookWithImageDto);
	}
	
}