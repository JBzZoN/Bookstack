package com.project.bookstack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bookstack.entities.Dummy;
import com.project.bookstack.repositories.DummyRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DummyService {

	@Autowired
	DummyRepository dummyRepo;
	
	public List<Dummy> dummyServiceFetch() {
		return dummyRepo.findAll();
	}
	
}
