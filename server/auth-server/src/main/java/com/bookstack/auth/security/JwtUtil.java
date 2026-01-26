package com.bookstack.auth.security;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import com.bookstack.auth.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
	
	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.expiration}")
	private long expirationMillis;
	
	private SecretKey signingKey;
	
	@PostConstruct
	public void init() {
		// Convert secret string to Key object
		signingKey = Keys.hmacShaKeyFor(secretKey.getBytes());
	}
	
	public String createToken(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		// Extract user info
		String userId = String.valueOf(user.getUserId());
		String roles = user.getAuthorities().stream()
		.map(GrantedAuthority::getAuthority)
		.collect(Collectors.joining(","));
		// Build JWT
		return Jwts.builder()
		.subject(userId) // User identifier
		.claim("roles", roles) // Custom claim
		.issuedAt(new Date()) // Creation time
		.expiration(new Date(
		System.currentTimeMillis() + expirationMillis)) // Expiry
		.signWith(signingKey) // Sign with secret
		.compact(); // Generate token string
	}
	
}