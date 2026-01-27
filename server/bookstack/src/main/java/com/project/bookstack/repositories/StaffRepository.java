package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bookstack.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff,Long>{

}
