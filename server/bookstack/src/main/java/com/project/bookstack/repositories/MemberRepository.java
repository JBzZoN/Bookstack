package com.project.bookstack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.bookstack.dto.MemberDetailsDto;
import com.project.bookstack.entities.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{

	 @Query("""
		        SELECT new com.project.bookstack.dto.MemberDetailsDto(
		            u.name,
		            u.email,
		            u.phone,
		            u.address,
		            u.dob,
		            u.username,
		            md.membershipType,
		            m.memberStart,
		            m.memberEnd
		        )
		        FROM Member m
		        JOIN m.user u
		        JOIN m.membershipData md
		
		    """)
		    List<MemberDetailsDto> getAllMembers();
}
