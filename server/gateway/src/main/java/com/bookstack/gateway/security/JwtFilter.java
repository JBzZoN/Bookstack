package com.bookstack.gateway.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * JWT Filter
 * =========================================================================
 * Intercepts incoming requests to validate the JSON Web Token (JWT) provided
 * in the Authorization header. If valid, sets the security context for the
 * current request.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse resp,
			FilterChain filterChain) throws ServletException, IOException {

		// 1. Extract Authorization header from the incoming request
		String authHeader = request.getHeader("Authorization");

		// 2. Check for Bearer token existence
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7); // Remove "Bearer " prefix

			// 3. Validate token and extract authentication details
			Authentication auth = jwtUtil.validateToken(token);

			// 4. Set authentication object in Spring SecurityContext if valid
			if (auth != null) {
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}

		// 5. Hand over to the next filter in the chain
		filterChain.doFilter(request, resp);
	}
}