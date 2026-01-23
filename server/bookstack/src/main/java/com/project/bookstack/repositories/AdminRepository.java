package com.project.bookstack.repositories;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.AdminDetailDto;
import com.project.bookstack.entities.Book;

import jakarta.transaction.Transactional;
import lombok.Lombok;

@Repository
public interface AdminRepository extends JpaRepository<Book,Long>{
	
	@Transactional
	@Query("""
			   select new com.project.bookstack.dto.AdminDetailDto(
			       b.isbn,
			       b.title,
			       b.author,
			       b.description,
			       b.publisher
			   )
			   from Book b
			""")
	List<AdminDetailDto> getAllBooks();
}
