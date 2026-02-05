package com.project.bookstack.repositories.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.MembershipData;

@Repository
public interface MembershipRepository extends JpaRepository<MembershipData, String> {

}
