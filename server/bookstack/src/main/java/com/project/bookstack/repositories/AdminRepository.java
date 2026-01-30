package com.project.bookstack.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.admin.AdminDetailDto;
import com.project.bookstack.entities.Book;

import jakarta.transaction.Transactional;



@Repository
public interface AdminRepository extends JpaRepository<Book,Long>{
	
	@Transactional
	@Query("""
			   select new com.project.bookstack.dto.admin.AdminDetailDto(
			       b.isbn,
			       b.title,
			       b.author,
			       b.description,
			       b.publisher,
			       b.edition
			   )
			   from Book b
			""")
			List<AdminDetailDto> getAllBooks();
}
