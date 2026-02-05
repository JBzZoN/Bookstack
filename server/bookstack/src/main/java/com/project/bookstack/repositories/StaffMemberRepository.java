package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.Member;

/**
 * Staff Member Repository
 * =========================================================================
 * Provides access to member data from the perspective of staff operations.
 * Allows staff to lookup and manage library patrons.
 */
public interface StaffMemberRepository extends JpaRepository<Member, Integer> {

}
