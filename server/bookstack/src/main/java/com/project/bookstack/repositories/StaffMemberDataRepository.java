package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.MembershipData;
import java.util.List;

/**
 * Staff Member Data Repository
 * =========================================================================
 * Provides access to membership plan metadata for staff operations.
 * Allows staff to verify member privileges based on their membership type.
 */
@Repository
public interface StaffMemberDataRepository extends JpaRepository<MembershipData, String> {

	MembershipData findByMembershipType(String membershipType);

}
