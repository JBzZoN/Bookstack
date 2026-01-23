package com.project.bookstack.services;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.bookstack.dto.BookDto;
import com.project.bookstack.entities.Book;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.User;
import com.project.bookstack.repositories.StaffBookRepository;
import com.project.bookstack.repositories.StaffMemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffService {

	private final StaffBookRepository staffBookRepository;
	
	private final StaffMemberRepository staffMemberRepository;
	
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
		// TODO Auto-generated method stub
		List<Member> result = staffMemberRepository.findAll();
				
		return result;
	}

	
}
