package com.project.bookstack.services;

import java.io.IOException;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
import com.project.bookstack.client.BookClient;
import com.project.bookstack.dto.BookCopyCountDto;
import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookGenreRequestDto;
import com.project.bookstack.dto.BookMemberDto;
import com.project.bookstack.dto.BookSearchDTO;
import com.project.bookstack.dto.BookWithImageDto;
import com.project.bookstack.dto.DueBookDto;
import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.MemberIdDto;
import com.project.bookstack.dto.RenewRequestDTO;
import com.project.bookstack.dto.RentRenewReturnRecordDTO;
import com.project.bookstack.dto.RentRenewReturnRequestDTO;
import com.project.bookstack.dto.RentRequestDTO;
import com.project.bookstack.dto.StatusCopyCountDto;
import com.project.bookstack.dto.UserDTO;
import com.project.bookstack.entities.Book;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.MemberBook;
import com.project.bookstack.entities.MemberBookId;
import com.project.bookstack.entities.MembershipData;
import com.project.bookstack.entities.Record;
import com.project.bookstack.entities.RecordDetail;
import com.project.bookstack.entities.Staff;
import com.project.bookstack.repositories.MemberBookRepository;
import com.project.bookstack.repositories.StaffBookRepository;
import com.project.bookstack.repositories.StaffDetailsRepository;
import com.project.bookstack.repositories.StaffMemberDataRepository;
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
	
	private final StaffMemberDataRepository staffMemberDataRepository;
	
	private final MemberBookRepository memberBookRepository;

	private final BookClient bookClient;
	
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
	
	public void resetRenew() {
		List<Member> allMembers = staffMemberRepository.findAll();
		for(Member a: allMembers) {
			a.setRenewCount(0);
		}
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

	public void uploadRecord(RentRenewReturnRequestDTO rentRenewReturnRequestDTO, Integer userId) {
		
		Record record = new Record();
		if(rentRenewReturnRequestDTO.getRecords().size() == 0) {
			return;
		}

        // Member reference (NO DB HIT)
		System.out.println(rentRenewReturnRequestDTO.getMemberId());
        Member member = staffMemberRepository.findById(rentRenewReturnRequestDTO.getMemberId()).get();
        record.setMember(member);

        // Staff reference (NO DB HIT)
        Staff staff = staffDetailsRepository.findById(userId).get();
        record.setStaff(staff);
        
        System.out.println(rentRenewReturnRequestDTO);

        record.setDate(LocalDate.now());

        staffRecordRepository.save(record);

        /* ------------------ Create Record Details ------------------ */

        for (RentRenewReturnRecordDTO r : rentRenewReturnRequestDTO.getRecords()) {

            RecordDetail detail = new RecordDetail();
            detail.setRecord(record);
            
            detail.setBookId(r.getBookId());
            detail.setStatus(r.getStatus());
            detail.setTotalCopies(r.getCopies());
            detail.setReturned(0);

            if ("Rent".equalsIgnoreCase(r.getStatus())) {
                detail.setDueDate(LocalDate.now().plusDays(member.getMembershipData().getBorrowPeriod()));
            }

            staffRecordDetailRepository.save(detail);
        }
		
	}

	public void sendEmail(String email) {
		kafkaTemplate.send("email-topic", new EmailDTO(email, null));
	}

	public Boolean rentValidation(RentRequestDTO rentRequestDTO) {
		// TODO Auto-generated method stub
		// use member id to get the member details(rent count + membershipType)
		Member b = staffMemberRepository.findById(rentRequestDTO.getMemberId()).get();
		// use find to find the membership rent limit
		MembershipData c = staffMemberDataRepository.findById(b.getMembershipData().getMembershipType()).get();
		
		// rentSelected + rentCount <= rent limit, return true
		
		if(rentRequestDTO.getRentSelected() + b.getRentCount() <= c.getBorrowLimit()) {
			return true;
		}
		
		// else return false
		
		return false;
	}

	public Boolean renewValidation(RenewRequestDTO renewRequestDTO) {
		// TODO Auto-generated method stub
		// use member id to get the member details(rent count + membershipType)
		Member b = staffMemberRepository.findById(renewRequestDTO.getMemberId()).get();
		// use find to find the membership rent limit
		MembershipData c = staffMemberDataRepository.findById(b.getMembershipData().getMembershipType()).get();
	
		// rentSelected + rentCount <= rent limit, return true
		
		if(renewRequestDTO.getRenewSelected() + b.getRenewCount() <= c.getRenewalLimit()) {
			return true;
		}
		
		// else return false
		
		return false;
	}

	public List<DueBookDto> getFineDetails(MemberIdDto memberIdDto) {
		
	
		return staffRecordDetailRepository.getFineDetails(memberIdDto.getMemberId(), LocalDate.now());
	}

	public void rentLogic(BookMemberDto bookMemberDto) {
		
		System.out.println(bookMemberDto);
		// find if record already present in member book table
		MemberBook a = memberBookRepository.findById(new MemberBookId(bookMemberDto.getMemberId(), bookMemberDto.getBookId())).orElseGet(() -> null);
			
		if(a == null) {
			// if not present add it as a new record
			memberBookRepository.save(new MemberBook(new MemberBookId(bookMemberDto.getMemberId(), bookMemberDto.getBookId()), bookMemberDto.getCopyCount()));
		}else {
			// if already present then update the count and remove it from "output"
			a.setCopyCount(a.getCopyCount() + bookMemberDto.getCopyCount());
			memberBookRepository.save(a);
		}
		
		// reduce rent_count by one(member_table)
		Member member = staffMemberRepository.findById(bookMemberDto.getMemberId()).get();	
		member.setRentCount(member.getRentCount() + bookMemberDto.getCopyCount());
		
	}

	public StatusCopyCountDto renewLogicSubmit(BookMemberDto bookMemberDto) {
		StatusCopyCountDto statusCopyCountDto;
		int copies = 0;
		
		// on renew or return fetch and put the value there when staff clicks verify
        // there is no status as renew in record_detail_table
		// add all the rented details copy counts(List of records) lift all same book + member combined records and calculate total copies
		// that needs to be renewed of that book
		List<RecordDetail> recordDetail = staffRecordDetailRepository.getReturnDataForRenew(bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		Member member = staffMemberRepository.findById(bookMemberDto.getMemberId()).get();
		
		if(recordDetail.isEmpty()) {
			System.out.println("Its empty so invalid renew");
			statusCopyCountDto = new StatusCopyCountDto("Invalid", -1);
		} else {
			
			for(RecordDetail a: recordDetail) {
				copies += a.getTotalCopies();
			}
			statusCopyCountDto = new StatusCopyCountDto("Valid", copies);
		}
		
		
        // just increment the due date
		for(RecordDetail rd : recordDetail) {
			rd.setDueDate(rd.getDueDate().plusDays(member.getMembershipData().getBorrowPeriod()));
		}
        // increase renew count by number of copies renewed
		member.setRenewCount(member.getRenewCount() + copies);
		// return the rented books(in record detail) which should be renewed
		return statusCopyCountDto;
	}

	public StatusCopyCountDto renewLogicVerify(BookMemberDto bookMemberDto) {
		List<RecordDetail> recordDetail = staffRecordDetailRepository.getReturnDataForRenew(bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		StatusCopyCountDto statusCopyCountDto;
		int copies = 0;
		
		if(recordDetail.isEmpty()) {
			System.out.println("Its empty so invalid renew");
			statusCopyCountDto = new StatusCopyCountDto("Invalid", -1);
		} else {
			
			for(RecordDetail a: recordDetail) {
				copies += a.getTotalCopies();
			}
			statusCopyCountDto = new StatusCopyCountDto("Valid", copies);
		}
		
		
		return statusCopyCountDto;
	}

	public StatusCopyCountDto returnLogicSubmit(BookMemberDto bookMemberDto) {
		// return status copy count dto for copy display in frontend
		StatusCopyCountDto statusCopyCountDto;
		int copies = 0;
		
		List<RecordDetail> recordDetail = staffRecordDetailRepository.getReturnDataForRenew(bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		
		if(recordDetail.isEmpty()) {
			System.out.println("Its empty so invalid renew");
			statusCopyCountDto = new StatusCopyCountDto("Invalid", -1);
		} else {
			
			for(RecordDetail a: recordDetail) {
				copies += a.getTotalCopies();

			    // set returned to 1(record detail table)
				a.setReturned(1);
			}
			statusCopyCountDto = new StatusCopyCountDto("Valid", copies);
		}
		
	    // increase number of books available (+ copies)
		Integer currentCopies = bookClient.getCopies(bookMemberDto.getBookId());
		bookClient.modifyCount(new BookCopyCountDto(bookMemberDto.getBookId(), currentCopies + copies));
		
		// reduce rent_count by one(member_table)
		Member member = staffMemberRepository.findById(bookMemberDto.getMemberId()).get();	
		member.setRentCount(member.getRentCount() - bookMemberDto.getCopyCount());
		
	    // reduce in member book table
		MemberBook a = memberBookRepository.findById(new MemberBookId(bookMemberDto.getMemberId(), bookMemberDto.getBookId())).orElseGet(() -> null);
		a.setCopyCount(a.getCopyCount() - bookMemberDto.getCopyCount());
		memberBookRepository.save(a);
		
	    // return number of copies rented
		return statusCopyCountDto;
	}

	public StatusCopyCountDto returnLogicVerify(BookMemberDto bookMemberDto) {
		// return status copy count dto for copy display in frontend
		StatusCopyCountDto statusCopyCountDto;
		int copies = 0;
		
		List<RecordDetail> recordDetail = staffRecordDetailRepository.getReturnDataForRenew(bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		
		if(recordDetail.isEmpty()) {
			System.out.println("Its empty so invalid renew");
			statusCopyCountDto = new StatusCopyCountDto("Invalid", -1);
		} else {
			
			for(RecordDetail a: recordDetail) {
				copies += a.getTotalCopies();
			}
			statusCopyCountDto = new StatusCopyCountDto("Valid", copies);
		}
		
		return statusCopyCountDto;
	}

	
}
