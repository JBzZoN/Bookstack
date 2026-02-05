package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.bookstack.entities.Record;

/**
 * Staff Record Repository
 * =========================================================================
 * Manages parent transaction records (Rent/Return sessions).
 * Links members and staff during circulation events.
 */
@Repository
public interface StaffRecordRepository extends JpaRepository<Record, Integer> {

}