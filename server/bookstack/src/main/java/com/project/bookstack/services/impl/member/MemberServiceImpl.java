package com.project.bookstack.services.impl.member;

import java.time.LocalDate;

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
import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.member.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final BookClientService bookClientService;
    private final MemberRepository memberRepository;

    @Override
    public List<BookCardDTO> getAllBooks() {
        // in a real scenario, you'd get this from the security context
        Integer userId = 11;

        // 1. fetch books from your node.js/external book-service
        List<BookCoreDTO> books = bookClientService.getAllBooks();

        // 2. fetch raw rating data (assuming repository returns List<Object[]>)
        List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();

        // 3. transform the list into a lookup map for O(1) performance
        // map key: bookid (integer), map value: average rating (double)
        Map<Integer, Double> ratingsLookup = rawRatings.stream()
            .collect(Collectors.toMap(
                row -> (Integer) row[0],                        // bookid
                row -> ((Number) row[1]).doubleValue(),         // safe numeric conversion
                (existing, replacement) -> existing             // handle duplicates
            ));

        // 4. fetch liked books for the user
        List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);

        // 5. aggregate andreturn
        return books.stream()
            .map(book -> new BookCardDTO(
                book.bookId(),
                book.title(),
                book.author(),
                book.bookImage(),
                ratingsLookup.getOrDefault(book.bookId(), 0.0), 
                likedBookIds.contains(book.bookId())
            ))
            .toList();
    }
    
    @Override
    public List<BookCardDTO> getAllLikedBooks() {
    	
    	Integer userId = 1; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<BookCoreDTO> books = bookClientService.getAllLikedBooks(likedBookIds);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));

           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookCardDTO> getRecommendedBooks() {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
    	
    	List<Integer> genreIds = memberRepository.getAllGenresByUserOwnedBooks(userId);
    	
    	List<Integer> Ids = memberRepository.getAllBooksByGenres(genreIds);
  
    	List<BookCoreDTO> books = bookClientService.getRecommendedBooks(Ids);
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookCardDTO> getTrendingBooks() {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
    	
    	List<Integer> trendingBookIds = rawRatings.stream()
    		.filter(row -> ((Double) row[1]) >= 4.5)          
    	    .map(row -> (Integer) row[0])                     
    	    .toList();
  
    	List<BookCoreDTO> books = bookClientService.getTrendingBooks(trendingBookIds);
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookCardDTO> getNewArrivedBooks() {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
  
    	List<BookCoreDTO> books = bookClientService.getNewArrivedBooks();
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookCardDTO> getAllRecommendedBooks() {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
    	
    	List<Integer> genreIds = memberRepository.getAllGenresByUserOwnedBooks(userId);
    	
    	List<Integer> Ids = memberRepository.getAllBooksByGenres(genreIds);
  
    	List<BookCoreDTO> books = bookClientService.getAllRecommendedBooks(Ids);
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookCardDTO> getAllTrendingBooks() {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
    	
    	List<Integer> trendingBookIds = rawRatings.stream()
    		.filter(row -> ((Double) row[1]) >= 4.5)          
    	    .map(row -> (Integer) row[0])                     
    	    .toList();
  
    	List<BookCoreDTO> books = bookClientService.getAllTrendingBooks(trendingBookIds);
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookCardDTO> getAllNewArrivedBooks() {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
  
    	List<BookCoreDTO> books = bookClientService.getAllNewArrivedBooks();
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public BookDTO getBookDetails(Integer bookId) {

        Integer userId = 11;

        List<Integer> likedBookSet = memberRepository.getAllBooksLikedByUser(userId);

    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));

        List<String> genres = memberRepository.getGenresByBookId(bookId);

        BookDTO book = bookClientService.getBookDetails(bookId);

        return new BookDTO(
            book.bookId(),
            book.isbn(),
            book.title(),
            book.author(),
            book.description(),
            genres,
            book.publisher(),
            book.numberOfCopies(),
            book.numberOfCopiesRemaining(),
            ratingsLookup.getOrDefault(book.bookId(), 0.0),
            likedBookSet.contains(book.bookId()),
            book.bookImage()
        );
        
    }
    
    @Override
    public List<BookCardDTO> getMightAlsoLikedBooks(Integer bookId) {
    	
    	Integer userId = 11; 
    	
    	List<Integer> likedBookIds = memberRepository.getAllBooksLikedByUser(userId);
    	
    	List<Object[]> rawRatings = memberRepository.getAverageRatingsGroupedByBook();
    	
    	Map<Integer, Double> ratingsLookup = rawRatings.stream()
	        .collect(Collectors.toMap(
	            row -> (Integer) row[0],                        
	            row -> ((Number) row[1]).doubleValue(),         
	            (existing, replacement) -> existing            
	        ));
    	
    	List<Integer> genreIds = memberRepository.getGenreIdsByBookId(bookId);
    	
    	List<Integer> Ids = memberRepository.getAllBooksByGenres(genreIds);
  
    	List<BookCoreDTO> books = bookClientService.getMightAlsoLikedBooks(bookId,Ids);
           
    	return books.stream()
	        .map(book -> new BookCardDTO(
	            book.bookId(),
	            book.title(),
	            book.author(),
	            book.bookImage(),
	            ratingsLookup.getOrDefault(book.bookId(), 0.0), 
	            likedBookIds.contains(book.bookId())
	        ))
	        .toList();
		
    }
    
    @Override
    public List<BookNameReturnDateDTO> getBorrrowedBooksHistory() {

        Integer userId = 1;

        List<BookIdReturnDateDTO> records =
                memberRepository.getBookIdAndReturnDates(userId);

        List<Integer> bookIds = records.stream()
                .map(BookIdReturnDateDTO::bookId)
                .toList();

        Map<Integer, String> bookIdToTitle =
                bookClientService.getBookNamesByIds(bookIds)
                        .stream()
                        .collect(Collectors.toMap(
                                BookIdTitleDTO::bookId,
                                BookIdTitleDTO::title
                        ));

        return records.stream()
                .map(r -> new BookNameReturnDateDTO(
                        bookIdToTitle.get(r.bookId()),
                        r.returnDate()
                ))
                .toList();
    }
    
    @Override
    public List<CurrentlyBorrowedBooksDTO> getCurrentlyBorrowedBooks() {

        Integer userId = 1;

        List<BookIdStartDueDatesDTO> records =
                memberRepository.getBookIdBorrowAndReturnDates(userId);

        List<Integer> bookIds = records.stream()
                .map(BookIdStartDueDatesDTO::bookId)
                .toList();

        Map<Integer, String> bookIdToTitle =
                bookClientService.getBookNamesByIds(bookIds)
                        .stream()
                        .collect(Collectors.toMap(
                                BookIdTitleDTO::bookId,
                                BookIdTitleDTO::title
                        ));

        return records.stream()
                .map(r -> new CurrentlyBorrowedBooksDTO(
                        bookIdToTitle.get(r.bookId()),
                        r.startDate(),
                        r.endDate()
                ))
                .toList();
    }

    
}

