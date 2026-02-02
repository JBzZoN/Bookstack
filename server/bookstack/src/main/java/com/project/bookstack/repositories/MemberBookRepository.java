package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.MemberBook;
import com.project.bookstack.entities.MemberBookId;

@Repository
public interface MemberBookRepository extends JpaRepository<MemberBook, MemberBookId>{
	
}
