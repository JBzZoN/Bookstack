package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.User;

public interface StaffMemberRepository extends JpaRepository<Member, Integer>{

}
