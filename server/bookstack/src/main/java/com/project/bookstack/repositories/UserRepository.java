package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.User;

public interface UserRepository extends JpaRepository<User, Long> 
{

}
