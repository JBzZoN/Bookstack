package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.bookstack.entities.Record;

@Repository
public interface StaffRecordRepository extends JpaRepository<Record, Integer> {
	
}