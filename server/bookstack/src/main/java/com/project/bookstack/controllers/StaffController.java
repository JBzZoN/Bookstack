package com.project.bookstack.controllers;

import java.util.List;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.bookstack.client.AuthorizationClient;
import com.project.bookstack.configuration.KafkaConfiguration;
import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookGenreRequestDto;
import com.project.bookstack.dto.BookMemberDto;
import com.project.bookstack.dto.BookSearchDTO;
import com.project.bookstack.dto.BookWithImageDto;
import com.project.bookstack.dto.DueBookDto;
import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.MemberIdDto;
import com.project.bookstack.dto.RenewRequestDTO;
import com.project.bookstack.dto.RentRenewReturnRequestDTO;
import com.project.bookstack.dto.RentRequestDTO;
import com.project.bookstack.dto.Search;
import com.project.bookstack.dto.UserDTO;
import com.project.bookstack.entities.Member;
import com.project.bookstack.services.StaffService;
import com.sun.net.httpserver.Request;

import lombok.RequiredArgsConstructor;

@RequestMapping("/staff")
@RequiredArgsConstructor
@RestController
public class StaffController {

    private final KafkaConfiguration kafkaConfiguration;
	
	public final StaffService staffService;
	
	public final AuthorizationClient authorizationClient;
	
	@PostMapping("/rent-count/valid")
	public ResponseEntity<?> rentValidation(@RequestBody RentRequestDTO rentRequestDTO) {
		return ResponseEntity.ok(staffService.rentValidation(rentRequestDTO));
	}
	
	@PostMapping("/renew-count/valid")
	public ResponseEntity<?> renewValidation(@RequestBody RenewRequestDTO renewRequestDTO) {
		return ResponseEntity.ok(staffService.renewValidation(renewRequestDTO));
	}
	
	@PostMapping("/rent-logic")
	public ResponseEntity<?> rentLogic(@RequestBody BookMemberDto bookMemberDto) {
		staffService.rentLogic(bookMemberDto);
		return ResponseEntity.ok(null);
	}
	
	@PostMapping("/renew-logic/submit")
	public ResponseEntity<?> renewLogicSubmit(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.renewLogicSubmit(bookMemberDto));
	}
	@PostMapping("/renew-logic/verify")
	public ResponseEntity<?> renewLogicVerify(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.renewLogicVerify(bookMemberDto));
	}
	
	@PostMapping("/return-logic/submit")
	public ResponseEntity<?> returnLogicSubmit(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.returnLogicSubmit(bookMemberDto));
	}
	@PostMapping("/return-logic/verify")
	public ResponseEntity<?> returnLogicVerify(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.returnLogicVerify(bookMemberDto));
	}
	
	@GetMapping("/books")
	public List<BookDto> getAllBooks() {
		return staffService.getAllBooks();
	}
	
	@PostMapping("/fine")
	public ResponseEntity<?> getFineDetails(@RequestBody MemberIdDto memberIdDto) {
		
		
		return ResponseEntity.ok(staffService.getFineDetails(memberIdDto));
	}
	
	@GetMapping("/members")
	public List<UserDTO> getAllMembers() {
		return staffService.getAllMembers();
	}
	
	@GetMapping("/book/{id}")
	public List<String> getGenre(@PathVariable Integer id) {
		return staffService.getGenre(id);
	}
	
	@PostMapping("/search/user")
	public List<UserDTO> searchUsers(@RequestBody Search userSearch) {
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
		System.out.println("EMail sent");
		staffService.sendEmail(emailDTO.getEmail());
	}
	
	@PostMapping(value = "/genre")
	public ResponseEntity<?> addBook(@RequestBody BookGenreRequestDto bookGenreRequestDto) {
		staffService.addBook(bookGenreRequestDto);
		return ResponseEntity.ok("Book Genre Added");
	}
	
}