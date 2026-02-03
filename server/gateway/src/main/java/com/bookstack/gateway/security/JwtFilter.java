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
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse resp, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Authentication auth = jwtUtil.validateToken(token);
            
            if (auth != null) {
                SecurityContextHolder.getContext().setAuthentication(auth);
                
                final String userId = jwtUtil.validateAndGetUserId(token);
                
                HttpServletRequest wrappedRequest = new jakarta.servlet.http.HttpServletRequestWrapper(request) {
                    @Override
                    public String getHeader(String name) {
                        if ("X-User-Id".equalsIgnoreCase(name)) {
                            return userId;
                        }
                        return super.getHeader(name);
                    }
                    
                    @Override
                    public java.util.Enumeration<String> getHeaders(String name) {
                        if ("X-User-Id".equalsIgnoreCase(name)) {
                            return java.util.Collections.enumeration(java.util.Collections.singletonList(userId));
                        }
                        return super.getHeaders(name);
                    }
                };
                
                filterChain.doFilter(wrappedRequest, resp);
                return;
            }
        }
        
        filterChain.doFilter(request, resp);
    }
}