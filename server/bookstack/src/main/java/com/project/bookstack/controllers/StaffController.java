package com.project.bookstack.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookGenreRequestDto;
import com.project.bookstack.dto.BookMemberDto;
import com.project.bookstack.dto.BookSearchDTO;
import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.MemberIdDto;
import com.project.bookstack.dto.RenewRequestDTO;
import com.project.bookstack.dto.RentRenewReturnRequestDTO;
import com.project.bookstack.dto.RentRequestDTO;
import com.project.bookstack.dto.Search;
import com.project.bookstack.dto.UserDTO;
import com.project.bookstack.services.StaffService;

import lombok.RequiredArgsConstructor;

/**
 * Staff Controller
 * =========================================================================
 * Handles operational tasks performed by library staff members.
 * Includes book issuance (rent), renewals, returns, and inventory management.
 */
@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

	private final StaffService staffService;

	/**
	 * Validates if a member is eligible to rent a book.
	 */
	@PostMapping("/rent-count/valid")
	public ResponseEntity<?> rentValidation(@RequestBody RentRequestDTO rentRequestDTO) {
		return ResponseEntity.ok(staffService.rentValidation(rentRequestDTO));
	}

	/**
	 * Validates if a book can be renewed by a member.
	 */
	@PostMapping("/renew-count/valid")
	public ResponseEntity<?> renewValidation(@RequestBody RenewRequestDTO renewRequestDTO) {
		return ResponseEntity.ok(staffService.renewValidation(renewRequestDTO));
	}

	/**
	 * Processes the logic for renting/issuing a book.
	 */
	@PostMapping("/rent-logic")
	public ResponseEntity<?> rentLogic(@RequestBody BookMemberDto bookMemberDto) {
		staffService.rentLogic(bookMemberDto);
		return ResponseEntity.ok(null);
	}

	/**
	 * Finalizes a book renewal request.
	 */
	@PostMapping("/renew-logic/submit")
	public ResponseEntity<?> renewLogicSubmit(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.renewLogicSubmit(bookMemberDto));
	}

	/**
	 * Verifies eligibility for book renewal.
	 */
	@PostMapping("/renew-logic/verify")
	public ResponseEntity<?> renewLogicVerify(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.renewLogicVerify(bookMemberDto));
	}

	/**
	 * Processes the logic for returning a book.
	 */
	@PostMapping("/return-logic/submit")
	public ResponseEntity<?> returnLogicSubmit(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.returnLogicSubmit(bookMemberDto));
	}

	/**
	 * Verifies the return of a book and calculates any associated fines.
	 */
	@PostMapping("/return-logic/verify")
	public ResponseEntity<?> returnLogicVerify(@RequestBody BookMemberDto bookMemberDto) {
		return ResponseEntity.ok(staffService.returnLogicVerify(bookMemberDto));
	}

	/**
	 * Retrieves all books available in the system catalog.
	 */
	@GetMapping("/books")
	public List<BookDto> getAllBooks() {
		return staffService.getAllBooks();
	}

	/**
	 * Retrieves fine details for a specific member.
	 */
	@PostMapping("/fine")
	public ResponseEntity<?> getFineDetails(@RequestBody MemberIdDto memberIdDto) {
		return ResponseEntity.ok(staffService.getFineDetails(memberIdDto));
	}

	/**
	 * Retrieves a list of all library members.
	 */
	@GetMapping("/members")
	public List<UserDTO> getAllMembers() {
		return staffService.getAllMembers();
	}

	/**
	 * Retrieves the genres associated with a specific book ID.
	 */
	@GetMapping("/book/{id}")
	public List<String> getGenre(@PathVariable Integer id) {
		return staffService.getGenre(id);
	}

	/**
	 * Searches for members based on name or ID.
	 */
	@PostMapping("/search/user")
	public List<UserDTO> searchUsers(@RequestBody Search userSearch) {
		return staffService.searchUsers(userSearch.search());
	}

	/**
	 * Searches for books based on title, author, or ISBN.
	 */
	@PostMapping("/search/book")
	public List<BookSearchDTO> searchBooks(@RequestBody Search bookSearch) {
		return staffService.searchBooks(bookSearch.search());
	}

	/**
	 * Uploads a record of rent/renew/return activity for tracking purposes.
	 */
	@PostMapping("/record")
	public void uploadRecord(@RequestBody RentRenewReturnRequestDTO rentRenewReturnRequestDTO,
			@RequestHeader("X-User-Id") Integer userId) {
		staffService.uploadRecord(rentRenewReturnRequestDTO, userId);
	}

	/**
	 * Sends a custom email notification (e.g., newsletter or library announcement).
	 */
	@PostMapping("/email")
	public void sendEmail(@RequestBody EmailDTO emailDTO) {
		staffService.sendEmail(emailDTO.getEmail());
	}

	/**
	 * Adds or updates a book's genre mapping.
	 */
	@PostMapping(value = "/genre")
	public ResponseEntity<?> addBook(@RequestBody BookGenreRequestDto bookGenreRequestDto) {
		staffService.addBook(bookGenreRequestDto);
		return ResponseEntity.ok("Book Genre Added");
	}

}