package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.Book;

@Repository
public interface StaffBookRepository extends JpaRepository<Book, Integer>{

}
