package com.project.bookstack.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookSearchDTO;
import com.project.bookstack.dto.BookWithImageDto;
import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.RentRenewReturnRequestDTO;
import com.project.bookstack.dto.Search;
import com.project.bookstack.entities.Book;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.User;
import com.project.bookstack.services.StaffService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/staff")
@RequiredArgsConstructor
@RestController
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
	
	@PostMapping("/search/user")
	public List<User> searchUsers(@RequestBody Search userSearch) {
		return staffService.searchUsers(userSearch.search());
	}
	
	@PostMapping("/search/book")
	public List<BookSearchDTO> searchBooks(@RequestBody Search bookSearch) {
		return staffService.searchBooks(bookSearch.search());
	}
	
	@PostMapping("/record")
	public void uploadRecord(@RequestBody RentRenewReturnRequestDTO rentRenewReturnRequestDTO) {
		staffService.uploadRecord(rentRenewReturnRequestDTO);
	}

	@PostMapping("/email")
	public void sendEmail(@RequestBody EmailDTO emailDTO) {
		staffService.sendEmail(emailDTO.getEmail());
	}
	
	@PostMapping(value = "/book", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public List<Member> addBook(@ModelAttribute BookWithImageDto bookWithImageDto) {
		return staffService.addBook(bookWithImageDto);
	}
	
}