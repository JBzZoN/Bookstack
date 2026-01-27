package com.project.bookstack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.Dummy;

@Repository
public interface DummyRepository extends JpaRepository<Dummy, String>{

}
