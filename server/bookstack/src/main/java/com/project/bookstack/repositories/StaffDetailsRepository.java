package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.Staff;

/**
 * Staff Details Repository
 * =========================================================================
 * Provides access to granular staff employment details.
 */
public interface StaffDetailsRepository extends JpaRepository<Staff, Integer> {

}
