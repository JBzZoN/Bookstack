package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.Member;

@Repository
public interface AdminMemberRepository extends JpaRepository<Member,Integer>{

	
}
