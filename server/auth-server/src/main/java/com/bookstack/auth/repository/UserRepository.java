package com.bookstack.auth.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bookstack.auth.entities.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	public List<User> findByUsername(String username);
	

    @Query("""
        SELECT u FROM User u
        WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.email) LIKE LOWER(CONCAT(:keyword, '%'))
           OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
	
}