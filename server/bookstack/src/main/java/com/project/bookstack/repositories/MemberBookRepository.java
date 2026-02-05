package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.MemberBook;
import com.project.bookstack.entities.MemberBookId;

/**
 * Member Book Repository
 * =========================================================================
 * Manages the possession status of books by members.
 * Used to track which members currently have (or have had) specific book
 * copies.
 */
@Repository
public interface MemberBookRepository extends JpaRepository<MemberBook, MemberBookId> {

}
