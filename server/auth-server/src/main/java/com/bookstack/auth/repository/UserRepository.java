package com.bookstack.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstack.auth.entities.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	public List<User> findByUsername(String username);
	
}