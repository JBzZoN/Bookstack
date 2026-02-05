package com.project.bookstack.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.project.bookstack.client.AuthorizationClient;
import com.project.bookstack.client.BookClient;
import com.project.bookstack.dto.BookCopyCountDto;
import com.project.bookstack.dto.BookDto;
import com.project.bookstack.dto.BookGenreRequestDto;
import com.project.bookstack.dto.BookMemberDto;
import com.project.bookstack.dto.BookSearchDTO;
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
import com.project.bookstack.exception.ResourceNotFoundException;
import com.project.bookstack.repositories.MemberBookRepository;
import com.project.bookstack.repositories.StaffBookRepository;
import com.project.bookstack.repositories.StaffDetailsRepository;
import com.project.bookstack.repositories.StaffMemberDataRepository;
import com.project.bookstack.repositories.StaffMemberRepository;
import com.project.bookstack.repositories.StaffRecordDetailRepository;
import com.project.bookstack.repositories.StaffRecordRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * Staff Service
 * =========================================================================
 * Manages daily library operations performed by staff.
 * Core responsibilities include:
 * - Book circulation (Rent, Renew, Return)
 * - Inventory tracking and search
 * - Fine management and notifications
 * - Member oversight and record maintenance
 */
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

	/**
	 * Retrieves all books from the inventory with full metadata.
	 */
	public List<BookDto> getAllBooks() {
		List<BookDto> bookDtoList = new ArrayList<>();

		for (Book b : staffBookRepository.findAll()) {
			bookDtoList.add(new BookDto(
					b.getIsbn(),
					b.getTitle(),
					b.getAuthor(),
					b.getDescription(),
					b.getPublisher(),
					b.getStaff().getUserId(),
					b.getAction(),
					b.getActionDate(),
					b.getBookId(),
					b.getNumberOfCopies(),
					b.getNumberOfCopiesRemaining(),
					b.getImage()));
		}
		return bookDtoList;
	}

	/**
	 * Resets the renewal count for all members (e.g., at the start of a period).
	 */
	public void resetRenew() {
		List<Member> allMembers = staffMemberRepository.findAll();
		for (Member member : allMembers) {
			member.setRenewCount(0);
		}
	}

	/**
	 * Retrieves all registered members, merging local membership status with
	 * profile data from the Auth Server.
	 */
	public List<UserDTO> getAllMembers() {
		List<UserDTO> authUsers = authorizationClient.getUsers();
		List<Member> localMembers = staffMemberRepository.findAll();

		return authUsers.stream()
				.filter(u -> "Member".equals(u.getRoleType()))
				.map(u -> {
					for (Member m : localMembers) {
						if (m.getUserId() == u.getUserId()) {
							u.setMemberEnd(m.getMemberEnd());
							u.setMembershipType(m.getMembershipData().getMembershipType());
							u.setMemberStart(m.getMemberStart());
						}
					}
					return u;
				}).toList();
	}

	/**
	 * Maps genres to a specific book.
	 * 
	 * @param bookGenreRequestDto Contains bookId and comma-separated genre IDs.
	 */
	public List<Member> addBook(BookGenreRequestDto bookGenreRequestDto) {
		String[] genreIds = bookGenreRequestDto.getGenres().split(",");

		for (String genreId : genreIds) {
			staffBookRepository.addBookGenre(bookGenreRequestDto.getBookId(), Integer.parseInt(genreId.trim()));
		}
		return null;
	}

	/**
	 * Fetches the list of genre names for a given book.
	 */
	public List<String> getGenre(Integer id) {
		return staffBookRepository.getGenreList(id);
	}

	/**
	 * Searches for users/members across the Auth Server.
	 */
	public List<UserDTO> searchUsers(String search) {
		return authorizationClient.getSearchedUsers(search);
	}

	/**
	 * Searches for books in the local repository with pagination.
	 */
	public List<BookSearchDTO> searchBooks(String search) {
		List<Book> searchResults = staffBookRepository.searchBooks(search, PageRequest.of(0, 5));
		return searchResults.stream()
				.map(book -> new BookSearchDTO(
						book.getBookId(),
						book.getTitle(),
						book.getAuthor(),
						book.getPublisher(),
						book.getIsbn()))
				.toList();
	}

	/**
	 * Records a mass transaction (multiple books) for a member.
	 * Handled as a single logical 'Record' with multiple 'RecordDetail' entries.
	 */
	public void uploadRecord(RentRenewReturnRequestDTO request, Integer staffId) {
		if (request.getRecords().isEmpty()) {
			return;
		}

		Record record = new Record();
		Member member = staffMemberRepository.findById(request.getMemberId())
				.orElseThrow(() -> new ResourceNotFoundException("Member", request.getMemberId()));
		Staff staff = staffDetailsRepository.findById(staffId)
				.orElseThrow(() -> new ResourceNotFoundException("Staff", staffId));

		record.setMember(member);
		record.setStaff(staff);
		record.setDate(LocalDate.now());
		staffRecordRepository.save(record);

		for (RentRenewReturnRecordDTO r : request.getRecords()) {
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

	/**
	 * Triggers an email event via Kafka.
	 */
	public void sendEmail(String email) {
		kafkaTemplate.send("email-topic", new EmailDTO(email, null));
	}

	/**
	 * Checks if a member has exceeded their simultaneous borrow limit.
	 */
	public Boolean rentValidation(RentRequestDTO rentRequestDTO) {
		Member member = staffMemberRepository.findById(rentRequestDTO.getMemberId()).get();
		MembershipData plan = staffMemberDataRepository.findById(member.getMembershipData().getMembershipType()).get();

		return (rentRequestDTO.getRentSelected() + member.getRentCount()) <= plan.getBorrowLimit();
	}

	/**
	 * Checks if a member has exceeded their renewal limit.
	 */
	public Boolean renewValidation(RenewRequestDTO renewRequestDTO) {
		Member member = staffMemberRepository.findById(renewRequestDTO.getMemberId()).get();
		MembershipData plan = staffMemberDataRepository.findById(member.getMembershipData().getMembershipType()).get();

		return (renewRequestDTO.getRenewSelected() + member.getRenewCount()) <= plan.getRenewalLimit();
	}

	/**
	 * Finalizes fine details for a specific member.
	 */
	public List<DueBookDto> getFineDetails(MemberIdDto memberIdDto) {
		return staffRecordDetailRepository.getFineDetails(memberIdDto.getMemberId(), LocalDate.now());
	}

	/**
	 * Updates the borrowing status when a book is issued.
	 */
	public void rentLogic(BookMemberDto bookMemberDto) {
		MemberBookId id = new MemberBookId(bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		MemberBook memberBook = memberBookRepository.findById(id).orElseGet(() -> {
			MemberBook mb = new MemberBook();
			mb.setId(id);
			mb.setCopyCount(0);
			return mb;
		});

		memberBook.setCopyCount(memberBook.getCopyCount() + bookMemberDto.getCopyCount());
		memberBookRepository.save(memberBook);

		Member member = staffMemberRepository.findById(bookMemberDto.getMemberId()).get();
		member.setRentCount(member.getRentCount() + bookMemberDto.getCopyCount());
	}

	/**
	 * Updates due dates and counts when a book is renewed.
	 */
	public StatusCopyCountDto renewLogicSubmit(BookMemberDto bookMemberDto) {
		List<RecordDetail> recordDetails = staffRecordDetailRepository.getReturnDataForRenew(
				bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		Member member = staffMemberRepository.findById(bookMemberDto.getMemberId()).get();

		if (recordDetails.isEmpty()) {
			return new StatusCopyCountDto("Invalid", -1);
		}

		int copies = recordDetails.stream().mapToInt(RecordDetail::getTotalCopies).sum();

		for (RecordDetail rd : recordDetails) {
			rd.setDueDate(rd.getDueDate().plusDays(member.getMembershipData().getBorrowPeriod()));
		}

		member.setRenewCount(member.getRenewCount() + copies);
		return new StatusCopyCountDto("Valid", copies);
	}

	/**
	 * Verifies if books are eligible for renewal.
	 */
	public StatusCopyCountDto renewLogicVerify(BookMemberDto bookMemberDto) {
		List<RecordDetail> recordDetails = staffRecordDetailRepository.getReturnDataForRenew(
				bookMemberDto.getMemberId(), bookMemberDto.getBookId());

		if (recordDetails.isEmpty()) {
			return new StatusCopyCountDto("Invalid", -1);
		}

		int copies = recordDetails.stream().mapToInt(RecordDetail::getTotalCopies).sum();
		return new StatusCopyCountDto("Valid", copies);
	}

	/**
	 * Processes book return, updates inventory availability and member borrow
	 * counts.
	 */
	public StatusCopyCountDto returnLogicSubmit(BookMemberDto bookMemberDto) {
		List<RecordDetail> recordDetails = staffRecordDetailRepository.getReturnDataForRenew(
				bookMemberDto.getMemberId(), bookMemberDto.getBookId());

		if (recordDetails.isEmpty()) {
			return new StatusCopyCountDto("Invalid", -1);
		}

		int totalReturnCopies = 0;
		for (RecordDetail rd : recordDetails) {
			totalReturnCopies += rd.getTotalCopies();
			rd.setReturned(1);
		}

		// Update global inventory count via Book Service
		Integer currentInventoryCount = bookClient.getCopies(bookMemberDto.getBookId());
		bookClient.modifyCount(new BookCopyCountDto(bookMemberDto.getBookId(),
				currentInventoryCount + totalReturnCopies));

		// Update member's active rent count
		Member member = staffMemberRepository.findById(bookMemberDto.getMemberId()).get();
		member.setRentCount(member.getRentCount() - bookMemberDto.getCopyCount());

		// Update specific member-book record
		MemberBookId id = new MemberBookId(bookMemberDto.getMemberId(), bookMemberDto.getBookId());
		memberBookRepository.findById(id).ifPresent(mb -> {
			mb.setCopyCount(mb.getCopyCount() - bookMemberDto.getCopyCount());
			memberBookRepository.save(mb);
		});

		return new StatusCopyCountDto("Valid", totalReturnCopies);
	}

	/**
	 * Verifies the pending returns for a member-book combination.
	 */
	public StatusCopyCountDto returnLogicVerify(BookMemberDto bookMemberDto) {
		List<RecordDetail> recordDetails = staffRecordDetailRepository.getReturnDataForRenew(
				bookMemberDto.getMemberId(), bookMemberDto.getBookId());

		if (recordDetails.isEmpty()) {
			return new StatusCopyCountDto("Invalid", -1);
		}

		int copies = recordDetails.stream().mapToInt(RecordDetail::getTotalCopies).sum();
		return new StatusCopyCountDto("Valid", copies);
	}
}