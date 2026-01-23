package com.project.bookstack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class BookstackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstackApplication.class, args);
	}

}
