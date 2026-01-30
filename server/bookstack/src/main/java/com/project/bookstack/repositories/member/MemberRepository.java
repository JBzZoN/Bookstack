package com.project.bookstack.repositories.member;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.member.ReviewDTO;
import com.project.bookstack.entities.Member;

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
	
}
