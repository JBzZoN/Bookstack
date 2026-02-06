package com.project.bookstack.services.impl.member;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.bookstack.clients.BookClientService;
import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookCoreDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.dto.member.BookIdReturnDateDTO;
import com.project.bookstack.dto.member.BookIdStartDueDatesDTO;
import com.project.bookstack.dto.member.BookIdTitleDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.CurrentlyBorrowedBooksDTO;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.member.BookLikeService;
import com.project.bookstack.services.member.MemberService;

import lombok.RequiredArgsConstructor;

/**
 * Member Service Implementation
 * =========================================================================
 * Implementation of MemberService that handles book discovery, recommendations,
 * trending books, and borrowing history. It bridges the gap between the
 * external 'book-service' (metadata) and the internal 'bookstack' DB
 * (ratings, interactions).
 */
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final BookClientService bookClientService;
	private final MemberRepository memberRepository;
	private final BookLikeService bookLikeService;

	/**
	 * Retrieves the main catalog of books with average ratings and user-specific
	 * like status.
	 */
	@Override
	public List<BookCardDTO> getAllBooks(Integer userId) {
		List<BookCoreDTO> books = bookClientService.getAllBooks();
		Map<Integer, Double> ratingsLookup = getRatingsLookupMap();
		List<Integer> likedBookIds = bookLikeService.getLikedBooks(userId);

		return books.stream()
				.map(book -> new BookCardDTO(book.bookId(), book.title(), book.author(), book.bookImage(),
						ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookIds.contains(book.bookId())))
				.toList();
	}

	/**
	 * Returns all books marked as 'liked' by the current member.
	 */
	@Override
	public List<BookCardDTO> getAllLikedBooks(Integer userId) {
		List<Integer> likedBookIds = bookLikeService.getLikedBooks(userId);
		List<BookCoreDTO> books = bookClientService.getAllLikedBooks(likedBookIds);
		Map<Integer, Double> ratingsLookup = getRatingsLookupMap();

		return books.stream()
				.map(book -> new BookCardDTO(book.bookId(), book.title(), book.author(), book.bookImage(),
						ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookIds.contains(book.bookId())))
				.toList();
	}

	/**
	 * Generates recommendations based on the genres of books the user has
	 * interacted with.
	 */
	@Override
	public List<BookCardDTO> getRecommendedBooks(Integer userId) {
		List<Integer> likedBookIds = bookLikeService.getLikedBooks(userId);
		Map<Integer, Double> ratingsLookup = getRatingsLookupMap();

		List<Integer> genreIds = memberRepository.getAllGenresByUserOwnedBooks(userId);
		List<Integer> ids = memberRepository.getAllBooksByGenres(genreIds);

		List<BookCoreDTO> books = bookClientService.getRecommendedBooks(ids);

		return books.stream()
				.map(book -> new BookCardDTO(book.bookId(), book.title(), book.author(), book.bookImage(),
						ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookIds.contains(book.bookId())))
				.toList();
	}

	/**
	 * Retrieves top-rated books (avg rating >= 4.5).
	 */
	@Override
	public List<BookCardDTO> getTrendingBooks(Integer userId) {
		List<Integer> likedBookIds = bookLikeService.getLikedBooks(userId);
		List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
		Map<Integer, Double> ratingsLookup = buildLookupFromRows(rawRatings);

		List<Integer> trendingBookIds = rawRatings.stream()
				.filter(row -> ((Number) row[1]).doubleValue() >= 4.5)
				.map(row -> (Integer) row[0]).toList();

		List<BookCoreDTO> books = bookClientService.getTrendingBooks(trendingBookIds);

		return books.stream()
				.map(book -> new BookCardDTO(book.bookId(), book.title(), book.author(), book.bookImage(),
						ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookIds.contains(book.bookId())))
				.toList();
	}

	/**
	 * Returns most recently added books.
	 */
	@Override
	public List<BookCardDTO> getNewArrivedBooks(Integer userId) {
		List<Integer> likedBookIds = bookLikeService.getLikedBooks(userId);
		Map<Integer, Double> ratingsLookup = getRatingsLookupMap();
		List<BookCoreDTO> books = bookClientService.getNewArrivedBooks();

		return books.stream()
				.map(book -> new BookCardDTO(book.bookId(), book.title(), book.author(), book.bookImage(),
						ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookIds.contains(book.bookId())))
				.toList();
	}

	@Override
	public List<BookCardDTO> getAllRecommendedBooks(Integer userId) {
		return getRecommendedBooks(userId);
	}

	@Override
	public List<BookCardDTO> getAllTrendingBooks(Integer userId) {
		return getTrendingBooks(userId);
	}

	@Override
	public List<BookCardDTO> getAllNewArrivedBooks(Integer userId) {
		return getNewArrivedBooks(userId);
	}

	/**
	 * Combines core metadata from Book Service with internal genre and rating data
	 * for a comprehensive book detail view.
	 */
	@Override
	public BookDTO getBookDetails(Integer userId, Integer bookId) {
		List<Integer> likedBookSet = bookLikeService.getLikedBooks(userId);
		Map<Integer, Double> ratingsLookup = getRatingsLookupMap();
		List<String> genres = memberRepository.getGenresByBookId(bookId);
		BookDTO book = bookClientService.getBookDetails(bookId);

		return new BookDTO(book.bookId(), book.isbn(), book.title(), book.author(), book.description(), genres,
				book.publisher(), book.numberOfCopies(), book.numberOfCopiesRemaining(),
				ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookSet.contains(book.bookId()), book.bookImage());
	}

	/**
	 * Finds books with similar genres to the given book ID.
	 */
	@Override
	public List<BookCardDTO> getMightAlsoLikedBooks(Integer userId, Integer bookId) {
		List<Integer> likedBookIds = bookLikeService.getLikedBooks(userId);
		Map<Integer, Double> ratingsLookup = getRatingsLookupMap();
		List<Integer> genreIds = memberRepository.getGenreIdsByBookId(bookId);
		List<Integer> ids = memberRepository.getAllBooksByGenres(genreIds);

		List<BookCoreDTO> books = bookClientService.getMightAlsoLikedBooks(bookId, ids);

		return books.stream()
				.map(book -> new BookCardDTO(book.bookId(), book.title(), book.author(), book.bookImage(),
						ratingsLookup.getOrDefault(book.bookId(), 0.0), likedBookIds.contains(book.bookId())))
				.toList();
	}

	/**
	 * Retrieves the member's complete history of borrowed and returned books.
	 */
	@Override
	public List<BookNameReturnDateDTO> getBorrrowedBooksHistory(Integer userId) {
		List<BookIdReturnDateDTO> records = memberRepository.getBookIdAndReturnDates(userId);
		List<Integer> bookIds = records.stream().map(BookIdReturnDateDTO::bookId).toList();

		Map<Integer, String> bookIdToTitle = bookClientService.getBookNamesByIds(bookIds).stream()
				.collect(Collectors.toMap(BookIdTitleDTO::bookId, BookIdTitleDTO::title));

		return records.stream()
				.map(r -> new BookNameReturnDateDTO(bookIdToTitle.get(r.bookId()), r.returnDate())).toList();
	}

	/**
	 * Retrieves currently borrowed books that are yet to be returned.
	 */
	@Override
	public List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks(Integer userId) {
		List<BookIdStartDueDatesDTO> records = memberRepository.getBookIdBorrowAndReturnDates(userId);
		List<Integer> bookIds = records.stream().map(BookIdStartDueDatesDTO::bookId).toList();

		Map<Integer, String> bookIdToTitle = bookClientService.getBookNamesByIds(bookIds).stream()
				.collect(Collectors.toMap(BookIdTitleDTO::bookId, BookIdTitleDTO::title));

		return records.stream()
				.map(r -> new CurrentlyBorrowedBooksDTO(bookIdToTitle.get(r.bookId()), r.startDate(), r.endDate()))
				.toList();
	}

	/**
	 * Internal helper to create a rating lookup map from raw DB rows.
	 */
	private Map<Integer, Double> getRatingsLookupMap() {
		List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
		return buildLookupFromRows(rawRatings);
	}

	private Map<Integer, Double> buildLookupFromRows(List<Object[]> rows) {
		return rows.stream().collect(Collectors.toMap(row -> (Integer) row[0], row -> ((Number) row[1]).doubleValue(),
				(existing, replacement) -> existing));
	}
}
