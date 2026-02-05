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

/**
 * Security Configuration
 * ==========================================================================
 * Configures Spring Security for the Auth Server.
 * 
 * Key Features:
 * - CSRF Disable: Since we use JWTs and are stateless.
 * - Stateless Session: No server-side HTTP sessions are maintained.
 * - BCrypt Encoding: Secured password storage.
 * - Selective Authorization: Permissive for /auth/** as per the microservices
 * architecture
 * where the API Gateway handles primary filtering.
 */
@Configuration
public class SecurityConfiguration {

	@Autowired
	CustomUserDetailsService userDetailsService;

	/**
	 * Configures the HTTP security filter chain.
	 * 
	 * @param http HttpSecurity builder.
	 * @return Built SecurityFilterChain.
	 * @throws Exception on configuration error.
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/auth/**").permitAll()
						.anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	/**
	 * Configures the BCrypt password encoder bean.
	 * BCrypt automatically generates and uses random salts for each password.
	 * 
	 * @return PasswordEncoder instance.
	 */
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Configures the AuthenticationManager, linking it to our
	 * CustomUserDetailsService.
	 * 
	 * @param http HttpSecurity builder to retrieve shared objects.
	 * @return Configured AuthenticationManager.
	 * @throws Exception on configuration error.
	 */
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

		authBuilder.userDetailsService(userDetailsService);
		return authBuilder.build();
	}

}
