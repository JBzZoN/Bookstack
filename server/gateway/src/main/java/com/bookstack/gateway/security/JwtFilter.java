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

@Component 
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse resp,
	FilterChain filterChain) throws ServletException, IOException {
		// 1. Extract Authorization header
		String authHeader = request.getHeader("Authorization");
		// 2. Check for Bearer token
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
		String token = authHeader.substring(7); // Remove "Bearer "
		Authentication auth = jwtUtil.validateToken(token); // 3. Validate token
		if (auth != null) // 4. Set authentication in SecurityContext
		SecurityContextHolder.getContext().setAuthentication(auth);
		}
		filterChain.doFilter(request, resp); // 5. Continue filter chain
	}
}