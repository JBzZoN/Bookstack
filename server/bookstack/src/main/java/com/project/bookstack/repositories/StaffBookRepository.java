package com.project.bookstack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.Book;

@Repository
public interface StaffBookRepository extends JpaRepository<Book, Integer>{

	@Query(value = "select g.genre_name from genre_table g join book_genre b on g.genre_id=b.genre_id where b.book_id=:id", nativeQuery = true)
	public List<String> getGenreList(@Param(value = "id") Integer id);

	
	@Modifying
	@Query(value = "insert into book_genre (book_id, genre_id) values(:bookId, :genreId)", nativeQuery = true)
	public void addBookGenre(@Param(value="bookId") Integer bookId, @Param(value="genreId") Integer genreId);
	
}