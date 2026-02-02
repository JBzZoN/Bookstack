package com.project.bookstack.services.impl.admin;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.bookstack.dto.admin.AllBookDto;

import kotlin.jvm.internal.SerializedIr;

@Service
@FeignClient(name = "admin-book-service", url = "http://localhost:4000")
public interface BookClientService {

	@GetMapping("/book/allbooks")
	public List<AllBookDto> getAllBooks();

}
