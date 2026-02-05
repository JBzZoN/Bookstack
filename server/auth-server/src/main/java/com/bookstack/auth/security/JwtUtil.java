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

/**
 * JWT Utility
 * ==========================================================================
 * Provides helper methods to generate and sign JSON Web Tokens (JWT).
 * 
 * Architecture:
 * - Uses HS256 algorithm for signing.
 * - Secret key and expiration are injected via application properties.
 * - Tokens contain 'sub' (User ID) and custom 'roles' claims.
 */
@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expiration}")
	private long expirationMillis;

	private SecretKey signingKey;

	/**
	 * Initializes the HMAC-SHA signing key from the provided secret string.
	 * Runs automatically after dependency injection.
	 */
	@PostConstruct
	public void init() {
		signingKey = Keys.hmacShaKeyFor(secretKey.getBytes());
	}

	/**
	 * Generates a signed JWT for an authenticated user.
	 * 
	 * @param authentication The valid authentication object from Spring Security.
	 * @return A compact JWT string.
	 */
	public String createToken(Authentication authentication) {
		User user = (User) authentication.getPrincipal();

		// Extract user identification (Subject)
		String userId = String.valueOf(user.getUserId());

		// Map user authorities to a comma-separated string for the JWT claim
		String roles = user.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		// Construct and sign the token
		return Jwts.builder()
				.subject(userId)
				.claim("roles", roles)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + expirationMillis))
				.signWith(signingKey)
				.compact();
	}

}