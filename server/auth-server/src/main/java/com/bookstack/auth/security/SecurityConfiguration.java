package com.bookstack.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bookstack.auth.service.CustomUserDetailsService;

@Configuration
public class SecurityConfiguration {

	@Autowired
	CustomUserDetailsService userDetailsService;
	
	
	// dummy security filter chain allowing all requests to login controller
	// Real filtering occurs in the api gateway security filter
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	    http
	        .csrf(csrf -> csrf.disable())
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/auth/**").permitAll()
	            .anyRequest().authenticated()
	        )
	        .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        );

	    return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
	// BCrypt automatically generates and uses salt
	return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) {
		AuthenticationManagerBuilder authBuilder =
		http.getSharedObject(AuthenticationManagerBuilder.class);
		
		authBuilder.userDetailsService(userDetailsService);
		return authBuilder.build();
	}
	
}