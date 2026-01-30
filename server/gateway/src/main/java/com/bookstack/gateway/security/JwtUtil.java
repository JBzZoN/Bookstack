package com.bookstack.gateway.security;


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
	
	
	public Authentication validateToken(String token) {
		try {
		// Parse and verify signature
		Claims claims = Jwts.parser().verifyWith(signingKey).build()
		.parseSignedClaims(token).getPayload();
		// Extract claims
		String userId = claims.getSubject();
		String roles = claims.get("roles", String.class);
		// Convert roles to authorities
		List<GrantedAuthority> authorities=
		AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
		// Create Authentication object
		return new UsernamePasswordAuthenticationToken(userId, null, authorities);
		} catch (JwtException e) {
		// Invalid token
		return null;
		}
	}
	
}