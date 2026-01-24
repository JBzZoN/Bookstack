package com.project.bookstack.services;

import java.io.IOException;

import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookSearchDTO;
import com.project.bookstack.dto.BookWithImageDto;
import com.project.bookstack.entities.Book;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.User;
import com.project.bookstack.repositories.StaffBookRepository;
import com.project.bookstack.repositories.StaffDetailsRepository;
import com.project.bookstack.repositories.StaffMemberRepository;
import com.project.bookstack.repositories.StaffUserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffService {

	private final StaffBookRepository staffBookRepository;
	
	private final StaffMemberRepository staffMemberRepository;

	private final StaffDetailsRepository staffDetailsRepository;
	
	private final StaffUserRepository staffUserRepository;
	
	public List<BookDto> getAllBooks() {
		// TODO Auto-generated method stub
		
		List<BookDto> bookDto = new ArrayList<>();

		for (Book b : staffBookRepository.findAll()) {
		    bookDto.add(
		        new BookDto(
		            b.getIsbn(),                       // String isbn
		            b.getTitle(),                      // String title
		            b.getAuthor(),                     // String author
		            b.getDescription(),                // String description
		            b.getPublisher(),                  // String publisher
		            b.getStaff().getUserId(),                        // Long userId
		            b.getAction(),                     // String action
		            b.getActionDate(),                 // LocalDate actionDate
		            b.getBookId(),          // Long bookId
		            b.getNumberOfCopies(),              // Integer numberOfCopies
		            b.getNumberOfCopiesRemaining(),
		            b.getImage()
		        )
		    );
		}

		
		return bookDto;
	}

	public List<Member> getAllMembers() {
		List<Member> result = staffMemberRepository.findAll();
		return result;
	}

	public List<Member> addBook(BookWithImageDto bookWithImageDto) {
		
		MultipartFile image = bookWithImageDto.imageFile();
		
		try {
			Files.copy(image.getInputStream(),
					Path.of("uploads").resolve(image.getOriginalFilename()),
					StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Book book = Book.builder()
		        .isbn(bookWithImageDto.isbn())
		        .image(image.getOriginalFilename())
		        .title(bookWithImageDto.title())
		        .author(bookWithImageDto.author())
		        .description(bookWithImageDto.description())
		        .publisher(bookWithImageDto.publisher())
		        .action("ADDED")
		        .actionDate(LocalDate.now())
		        .numberOfCopies(bookWithImageDto.copies())
		        .numberOfCopiesRemaining(bookWithImageDto.copies())
		        .staff(staffDetailsRepository.findById(bookWithImageDto.staffId()).get())
		        .build();

		
		staffBookRepository.save(book);
		
		String[] genreList = bookWithImageDto.genres().split(",");
		
		for(String genre : genreList) {
			staffBookRepository.addBookGenre(book.getBookId(), Integer.parseInt(genre));
		}
		
		return null;
	}

	public List<String> getGenre(Integer id) {
		return staffBookRepository.getGenreList(id);
	}

	public List<User> searchUsers(String search) {
		// TODO Auto-generated method stub
		List<User> searchResults = staffUserRepository.searchUsers(search, PageRequest.of(0, 5));
		return  searchResults;
	}
	
	public List<BookSearchDTO> searchBooks(String search) {
		// TODO Auto-generated method stub
		List<Book> searchResults = staffBookRepository.searchBooks(search, PageRequest.of(0, 5));
		List<BookSearchDTO> dtoList = searchResults.stream()
			    .map(book -> new BookSearchDTO(
			        book.getBookId(),
			        book.getTitle(),
			        book.getAuthor(),
			        book.getPublisher(),
			        book.getIsbn()
			    )).toList();   // Java 16+
		
		
		return  dtoList;
	}

	
}
