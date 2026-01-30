package com.project.bookstack.repositories;

import java.util.List;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.dto.member.BookDTO;
import com.project.bookstack.entities.Book;


@Repository
public interface MemberRepository extends JpaRepository<Book, Integer> {
	
	/* SQL equivalent:
		  SELECT 
		    b.book_id,
		    b.title,
		    b.author,
		    b.book_image,
		    COALESCE(AVG(r.rating), 0) AS avg_rating,
		    CASE
		 	    WHEN EXISTS (
		 	        SELECT 1
		 	        FROM book_like bl
		           WHERE bl.book_id = b.book_id
		 	          AND bl.user_id = ?
		 	    )
		 	    THEN true
		 	    ELSE false
		 	 END AS liked_by_current_user
		  FROM book_table b
		  LEFT JOIN book_rating r ON r.book_id = b.book_id
		  GROUP BY b.book_id, b.title, b.author,b.book_image;
	*/
	@Query("""
	    SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	    )
	    FROM Book b
		LEFT JOIN b.ratings r
	    GROUP BY b.bookId, b.title, b.author,b.bookImage
	""")
	List<BookCardDTO> getAllBooks(@Param("userId") Integer userId);
	
	
	/* SQL equivalent:
		   SELECT
			    b.book_id,
			    b.title,
			    b.author,
			    b.book_image,
			    COALESCE(AVG(r.rating), 0) AS avg_rating,
			    true
			FROM book_table b
			INNER JOIN book_like bl
			        ON bl.book_id = b.book_id AND bl.user_id = ?
			LEFT JOIN book_rating r
			       ON r.book_id = b.book_id
			GROUP BY
			    b.book_id,
			    b.title,
			    b.author,
		    	b.book_image;
	*/
	
	@Query("""
	    SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            true
	    )
	    FROM Book b
	    INNER JOIN b.likedByUsers l
		LEFT JOIN b.ratings r
		WHERE l.userId = :userId
	    GROUP BY b.bookId, b.title, b.author, b.bookImage
	""")
	List<BookCardDTO> getAllLikedBooks(@Param("userId") Integer userId);
	
	/* SQL equivalent
	 		SELECT
			    b.book_id,
			    b.title,
			    b.author,
			    b.book_image,
			    COALESCE(AVG(r.rating), 0) AS avg_rating,
			    CASE
			        WHEN EXISTS (
			            SELECT 1
			            FROM book_like bl
			            WHERE bl.book_id = b.book_id
			              AND bl.user_id = ?
			        ) THEN true
			        ELSE false
			    END AS current_user_like
			FROM book_table b
			JOIN book_genre bg
			       ON bg.book_id = b.book_id
			LEFT JOIN book_rating r
			       ON r.book_id = b.book_id
			WHERE bg.genre_id IN (
			          SELECT DISTINCT bg2.genre_id
			          FROM book_genre bg2
			          JOIN member_book_table mb
			               ON bg2.book_id = mb.book_id
			          WHERE mb.user_id = ?
			      )
			  AND b.book_id NOT IN (
			          SELECT book_id
			          FROM member_book_table
			          WHERE user_id = ?
			      )
			GROUP BY
			    b.book_id,
			    b.title,
			    b.author,
			    b.book_image
			LIMIT 10;
	*/
	
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	        )
	        FROM Book b
	        JOIN b.genres g
	        LEFT JOIN b.ratings r
	        WHERE g.genreId IN (
	            SELECT DISTINCT g2.genreId
	            FROM MemberBook mb
	            JOIN mb.book b2
	            JOIN b2.genres g2
	            WHERE mb.user.userId = :userId
	        )
	        AND b.bookId NOT IN (
	            SELECT mb2.book.bookId
	            FROM MemberBook mb2
	            WHERE mb2.user.userId = :userId
	        )
	        GROUP BY b.bookId, b.title, b.author, b.bookImage
	""")
	List<BookCardDTO> getRecommendedBooks(
		@Param("userId") Integer userId,
	    Pageable pageable
	);
	    
	/* SQL equivalent
	   SELECT
		    b.book_id,
		    b.title,
		    b.author,
		    b.book_image,
		    COALESCE(AVG(r.rating), 0) AS avg_rating,
		    CASE
		        WHEN EXISTS (
		            SELECT 1
		            FROM book_like bl
		            WHERE bl.book_id = b.book_id
		              AND bl.user_id = 11
		        )
		        THEN true
		        ELSE false
		    END AS current_user_like
		FROM book_table b
		LEFT JOIN book_rating r
		    ON r.book_id = b.book_id
		GROUP BY
		    b.book_id,
		    b.title,
		    b.author,
		    b.book_image
		HAVING AVG(r.rating) >= 4.5
		limit 10;
	*/
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	        )
	        FROM Book b
	        LEFT JOIN b.ratings r
	        GROUP BY b.bookId, b.title, b.author, b.bookImage
	        HAVING AVG(r.rating) >= 4.5
	""")
	List<BookCardDTO> getTrendingBooks(
		@Param("userId") Integer userId,
	    Pageable pageable
	);
	
	/* SQL equivalent
	   SELECT
		    b.book_id,
		    b.title,
		    b.author,
		    b.book_image,
		    b.action_date,
		    COALESCE(AVG(r.rating), 0) AS avg_rating,
		    CASE
		        WHEN EXISTS (
		            SELECT 1
		            FROM book_like bl
		            WHERE bl.book_id = b.book_id
		              AND bl.user_id = 11
		        )
		        THEN true
		        ELSE false
		    END AS current_user_like
		FROM book_table b
		LEFT JOIN book_rating r
		    ON r.book_id = b.book_id
		GROUP BY
		    b.book_id,
		    b.title,
		    b.author,
		    b.book_image
		ORDER BY b.action_date DESC
		limit 10;
	*/
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	        )
	        FROM Book b
	        LEFT JOIN b.ratings r
	        GROUP BY b.bookId, b.title, b.author, b.bookImage
	        ORDER BY b.actionDate DESC
	""")
	List<BookCardDTO> getNewArrivedBooks(
		@Param("userId") Integer userId,
	    Pageable pageable
	);
	
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	        )
	        FROM Book b
	        JOIN b.genres g
	        LEFT JOIN b.ratings r
	        WHERE g.genreId IN (
	            SELECT DISTINCT g2.genreId
	            FROM MemberBook mb
	            JOIN mb.book b2
	            JOIN b2.genres g2
	            WHERE mb.user.userId = :userId
	        )
	        AND b.bookId NOT IN (
	            SELECT mb2.book.bookId
	            FROM MemberBook mb2
	            WHERE mb2.user.userId = :userId
	        )
	        GROUP BY b.bookId, b.title, b.author, b.bookImage
	""")
	List<BookCardDTO> getAllRecommendedBooks(
		@Param("userId") Integer userId
	);
	
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	        )
	        FROM Book b
	        LEFT JOIN b.ratings r
	        GROUP BY b.bookId, b.title, b.author, b.bookImage
	        HAVING AVG(r.rating) >= 4.5
	""")
	List<BookCardDTO> getAllTrendingBooks(
		@Param("userId") Integer userId
	);
	
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
	            b.bookId,
	            b.title,
	            b.author,
	            b.bookImage,
	            COALESCE(AVG(r.rating), 0),
	            CASE
	                WHEN EXISTS (
	                    SELECT 1
	                    FROM BookLike bl
	                    WHERE bl.book = b
	                      AND bl.user.userId = :userId
	                )
	                THEN true
	                ELSE false
	            END
	        )
	        FROM Book b
	        LEFT JOIN b.ratings r
	        GROUP BY b.bookId, b.title, b.author, b.bookImage
	        ORDER BY b.actionDate DESC
	""")
	List<BookCardDTO> getAllNewArrivedBooks(
		@Param("userId") Integer userId,
	    Pageable pageable
	);
	
	/* SQL equivalent
	   SELECT
		    b.book_id,
		    b.isbn,
		    b.title,
		    b.author,
		    b.description,
		    b.publisher,
		    null,
		    b.number_of_copies,
		    b.number_of_copies_remaining,
		    b.action_date,
		    COALESCE(AVG(r.rating), 0) AS avg_rating,
		    CASE
		        WHEN EXISTS (
		            SELECT 1
		            FROM book_like bl
		            WHERE bl.book_id = b.book_id
		              AND bl.user_id = ?
		        )
		        THEN true
		        ELSE false
		    END AS current_user_like,
		    b.book_image
		FROM book_table b
		LEFT JOIN book_rating r
		    ON r.book_id = b.book_id
		WHERE b.book_id = ?
		GROUP BY
		    b.book_id,
		    b.title,
		    b.author,
		    b.book_image;
	*/
	@Query("""
			SELECT new com.project.bookstack.dto.member.BookDTO(
			    b.bookId,
			    b.isbn,
			    b.title,
			    b.author,
			    b.description,
			    null,
			    b.publisher,
			    b.numberOfCopies,
			    b.numberOfCopiesRemaining,
			    COALESCE(AVG(r.rating), 0),
			    CASE WHEN EXISTS (
			        SELECT 1 FROM BookLike bl
			        WHERE bl.book = b AND bl.user.userId = :userId
			    ) THEN true ELSE false END,
			    b.bookImage
			)
			FROM Book b
			LEFT JOIN b.ratings r
			WHERE b.bookId = :bookId
			GROUP BY b.bookId
	""")
	BookDTO getBookCore(Integer bookId, Integer userId);
	
	@Query("""
			SELECT g.genreName
			FROM Book b
			JOIN b.genres g
			WHERE b.bookId = :bookId
	""")
	List<String> getGenresByBookId(Integer bookId);
	
	@Query("""
	        SELECT new com.project.bookstack.dto.member.BookCardDTO(
			    b.bookId,
			    b.title,
			    b.author,
			    b.bookImage,
			    COALESCE(AVG(r.rating), 0),
			    CASE
			        WHEN EXISTS (
			            SELECT 1
			            FROM BookLike bl
			            WHERE bl.book = b
			              AND bl.user.userId = :userId
			        )
			        THEN true
			        ELSE false
			    END
			)
			FROM Book b
			JOIN b.genres g
			LEFT JOIN b.ratings r
			WHERE g IN (
			    SELECT g2
			    FROM Book b2
			    JOIN b2.genres g2
			    WHERE b2.bookId = :bookId
			)
			AND b.bookId != :bookId
			GROUP BY b.bookId, b.title, b.author, b.bookImage
	""")
	List<BookCardDTO> getMightAlsoLikedBooks(
		@Param("userId") Integer userId,@Param("bookId") Integer bookId,
	    Pageable pageable
	);
	
	
	
}
