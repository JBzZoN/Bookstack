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
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.bookstack.client.AuthorizationClient;
import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookGenreRequestDto;
import com.project.bookstack.dto.BookSearchDTO;
import com.project.bookstack.dto.BookWithImageDto;
import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.RentRenewReturnRecordDTO;
import com.project.bookstack.dto.RentRenewReturnRequestDTO;
import com.project.bookstack.dto.UserDTO;
import com.project.bookstack.entities.Book;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.Record;
import com.project.bookstack.entities.RecordDetail;
import com.project.bookstack.entities.Staff;
import com.project.bookstack.repositories.StaffBookRepository;
import com.project.bookstack.repositories.StaffDetailsRepository;
import com.project.bookstack.repositories.StaffMemberRepository;
import com.project.bookstack.repositories.StaffRecordDetailRepository;
import com.project.bookstack.repositories.StaffRecordRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffService {

	private final StaffBookRepository staffBookRepository;
	
	private final StaffMemberRepository staffMemberRepository;

	private final StaffDetailsRepository staffDetailsRepository;
	
	private final StaffRecordRepository staffRecordRepository;
	
	private final StaffRecordDetailRepository staffRecordDetailRepository;
	
	private final AuthorizationClient authorizationClient;
	
	private final KafkaTemplate<String, EmailDTO> kafkaTemplate;
	
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
		            b.getStaff().getUserId(),          // Long userId
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

	public List<UserDTO> getAllMembers() {
		List<UserDTO> searchResults = authorizationClient.getUsers();
		List<Member> memberResults = staffMemberRepository.findAll();
		
		List<UserDTO> finalOutput = searchResults.stream().map((e) -> {
			for(Member m : memberResults) {
				if(m.getUserId() == e.getUserId()) {
					System.out.println(m.getMembershipData().getMembershipType());
					e.setMemberEnd(m.getMemberEnd());
					e.setMembershipType(m.getMembershipData().getMembershipType());
					e.setMemberStart(m.getMemberStart());
				}
			}

			return e;
		}).filter(e ->  e.getRoleType().equals("Member")).toList();
		return finalOutput;
	}

	public List<Member> addBook(BookGenreRequestDto bookGenreRequestDto) {
		
		String[] genreList = bookGenreRequestDto.getGenres().split(",");
		
		for(String genre : genreList) {
			staffBookRepository.addBookGenre(bookGenreRequestDto.getBookId(), Integer.parseInt(genre));
		}
		
		return null;
	}

	public List<String> getGenre(Integer id) {
		return staffBookRepository.getGenreList(id);
	}

	public List<UserDTO> searchUsers(String search) {
		// TODO Auto-generated method stub
		return  authorizationClient.getSearchedUsers(search);
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

	public void uploadRecord(RentRenewReturnRequestDTO rentRenewReturnRequestDTO) {
		
		Record record = new Record();

        // Member reference (NO DB HIT)
		System.out.println(rentRenewReturnRequestDTO.getMemberId());
        Member member = staffMemberRepository.findById(rentRenewReturnRequestDTO.getMemberId()).get();
        record.setMember(member);

        // Staff reference (NO DB HIT)
        Staff staff = staffDetailsRepository.findById(rentRenewReturnRequestDTO.getStaffId()).get();
        record.setStaff(staff);

        record.setDate(LocalDate.now());

        staffRecordRepository.save(record);

        /* ------------------ Create Record Details ------------------ */

        for (RentRenewReturnRecordDTO r : rentRenewReturnRequestDTO.getRecords()) {

            RecordDetail detail = new RecordDetail();
            detail.setRecord(record);

            // Book reference (NO DB HIT)
            Book book = staffBookRepository.findById(r.getBookId()).get();
            detail.setBook(book);

            detail.setStatus(r.getStatus());
            detail.setTotalCopies(r.getCopies());

            if ("Rent".equalsIgnoreCase(r.getStatus())) {
                detail.setDueDate(LocalDate.now().plusDays(14));
            }

            staffRecordDetailRepository.save(detail);
        }
		
	}

	public void sendEmail(String email) {
		kafkaTemplate.send("email-topic", new EmailDTO(email));
	}

	
}
