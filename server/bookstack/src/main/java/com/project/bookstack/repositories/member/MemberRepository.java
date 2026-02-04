package com.project.bookstack.repositories.member;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.member.BookIdReturnDateDTO;
import com.project.bookstack.dto.member.BookIdStartDueDatesDTO;
import com.project.bookstack.dto.member.BookNameReturnDateDTO;
import com.project.bookstack.dto.member.BookSearchDTO;
import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.User;

import jakarta.transaction.Transactional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

	@Query("SELECT bl.bookId FROM BookLike bl WHERE bl.userId = :userId")
	List<Integer> getAllBooksLikedByUser(Integer userId);

	@Query("SELECT r.bookId,COALESCE(AVG(r.rating), 0) FROM BookRating r GROUP BY r.bookId")
	List<Object[]> getAverageRatingsGroupedByBook();

	@Query("SELECT DISTINCT bgm.id.genreId FROM MemberBook mb JOIN BookGenreMapping bgm ON mb.id.bookId = bgm.id.bookId WHERE mb.id.userId = :userId")
	List<Integer> getAllGenresByUserOwnedBooks(@Param("userId") Integer userId);

	@Query("SELECT DISTINCT bgm.id.bookId FROM BookGenreMapping bgm WHERE bgm.id.genreId IN ( :genreIds )")
	List<Integer> getAllBooksByGenres(@Param(value = "genreIds") List<Integer> genreIds);

	@Query("SELECT bg.genreName FROM BookGenre bg JOIN BookGenreMapping bgm ON bgm.id.genreId = bg.genreId WHERE bgm.id.bookId = :bookId")
	List<String> getGenresByBookId(@Param(value = "bookId") Integer bookId);

	@Query("SELECT bgm.id.genreId FROM MemberBook mb JOIN BookGenreMapping bgm ON mb.id.bookId = bgm.id.bookId WHERE mb.id.bookId = :bookId")
	List<Integer> getGenreIdsByBookId(@Param(value = "bookId") Integer bookId);

	@Query("""
			    SELECT new com.project.bookstack.dto.member.ReviewDTO(
			        c.userId,
			        COALESCE(r.rating, 0),
			        c.comment,
			        c.createdAt,
			        COALESCE(u.name, 'Unknown User')
			    )
			    FROM BookComment c
			    LEFT JOIN BookRating r
			        ON r.bookId = c.bookId AND r.userId = c.userId
			       LEFT JOIN User u ON u.userId = c.userId
			    WHERE c.bookId = :bookId
			    ORDER BY c.createdAt DESC
			""")
	List<ReviewDTO> findReviewsByBookId(@Param("bookId") Integer bookId);

	@Query("""
			SELECT new com.project.bookstack.dto.member.BookIdReturnDateDTO(
			    rd.bookId,
			    r.date
			)
			FROM RecordDetail rd
			JOIN rd.record r
			WHERE rd.status = 'Returned'
			  	AND r.member.userId = :userId
			""")
	List<BookIdReturnDateDTO> getBookIdAndReturnDates(@Param("userId") Integer userId);

	@Query("""
			SELECT new com.project.bookstack.dto.member.BookIdStartDueDatesDTO(
				rd.bookId,
				r.date,
				rd.dueDate
			)
			FROM RecordDetail rd
			JOIN rd.record r
			WHERE rd.status = 'Rent'
				AND r.member.userId = :userId
			""")
	List<BookIdStartDueDatesDTO> getBookIdBorrowAndReturnDates(Integer userId);

	@Query("SELECT rd FROM RecordDetail rd JOIN rd.record r WHERE r.member.userId = :userId AND rd.bookId = :bookId AND rd.status = 'Rent'")
	java.util.Optional<com.project.bookstack.entities.RecordDetail> findActiveRent(@Param("userId") Integer userId,
			@Param("bookId") Integer bookId);

}
