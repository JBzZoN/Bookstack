package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.MembershipData;
import java.util.List;


@Repository
public interface StaffMemberDataRepository extends JpaRepository<MembershipData, String> {

	MembershipData findByMembershipType(String membershipType);
	
}
