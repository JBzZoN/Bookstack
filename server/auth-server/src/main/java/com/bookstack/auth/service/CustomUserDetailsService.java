package com.bookstack.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bookstack.auth.entities.User;
import com.bookstack.auth.repository.UserRepository;

import java.util.List;

/**
 * Custom User Details Service
 * =========================================================================
 * Implements Spring Security's {@link UserDetailsService} to bridge
 * the authentication provider with our MySQL user database.
 * 
 * Flow:
 * 1. Spring Security calls {@link #loadUserByUsername(String)} with the login
 * username.
 * 2. This service queries the UserRepository.
 * 3. Returns the User entity (which implements UserDetails).
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	/**
	 * Loads a user's details from the database by their username.
	 * 
	 * @param username The username provided in the login request.
	 * @return UserDetails populated with user info and authorities.
	 * @throws UsernameNotFoundException if no user matches the username.
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		List<User> users = userRepository.findByUsername(username);

		if (users == null || users.isEmpty()) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}

		// Note: Guaranteed to be unique if existsByUsername check is enforced on
		// registration
		return users.get(0);
	}
}