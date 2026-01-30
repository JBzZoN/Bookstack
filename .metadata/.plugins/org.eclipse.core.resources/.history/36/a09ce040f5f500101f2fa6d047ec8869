package com.project.bookstack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.entities.Dummy;
import com.project.bookstack.services.DummyService;

@RestController
@RequestMapping("dummy")
public class DummyController {

	@Autowired
	DummyService dummyService;
	
	@GetMapping("/all")
	public List<Dummy> dummyFetch() {
		return dummyService.dummyServiceFetch();
	}
	
}
