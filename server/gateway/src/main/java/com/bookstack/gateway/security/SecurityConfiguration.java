package com.bookstack.gateway.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {
	
	@Autowired
	JwtFilter jwtFilter;
	
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		// Disable CSRF for stateless APIs
		.csrf(csrf -> csrf.disable())
		// Enable CORS Filter
		.cors(Customizer.withDefaults()) // Or use withDefaults()
		// URL authorization
		.authorizeHttpRequests(requests -> requests
			.requestMatchers("/auth/**", "/staff/image/**","/payment/**").permitAll()
			.requestMatchers("/member/**").hasAuthority("Member")
			.requestMatchers("/admin/**").hasAuthority("Admin")
			.requestMatchers("/staff/**").hasAuthority("Librarian")
			.anyRequest().authenticated()
		)
		// Session management - STATELESS for JWT
		.sessionManagement(session -> session
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		// Add JWT filter before authentication filter
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
	// BCrypt automatically generates and uses salt
	return new BCryptPasswordEncoder();
	}
	
}