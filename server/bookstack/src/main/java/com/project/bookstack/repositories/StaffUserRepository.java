package com.project.bookstack.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.User;

@Repository
public interface StaffUserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT u FROM User u WHERE u.roleType='Member' and (u.username LIKE CONCAT('%', :q, '%') OR u.email LIKE CONCAT(:q, '%') OR u.name LIKE CONCAT('%', :q, '%'))")
	List<User> searchUsers(
	    @Param("q") String q,
	    Pageable pageable
	);
	
	List<User> findByRoleType(String roleType);
}
