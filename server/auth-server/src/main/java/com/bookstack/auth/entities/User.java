package com.bookstack.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * User Entity
 * ==========================================================================
 * Represents a registered user in the BookStack system.
 * This class implements the {@link UserDetails} interface to integrate
 * seamlessly with Spring Security's authentication provider.
 * 
 * Fields:
 * - userId: Primary key (Auto-incremented).
 * - roleType: Defines the user's authority (e.g., ADMIN, LIBRARIAN, MEMBER).
 * - authorities: Derived from roleType for security checks.
 */
@Entity
@Table(name = "user_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Integer userId;

	@Column(name = "name", length = 30)
	private String name;

	@Column(name = "email", length = 30)
	private String email;

	@Column(name = "phone", length = 10)
	private String phone;

	@Column(name = "address", length = 45)
	private String address;

	@Column(name = "dob")
	private LocalDate dob;

	@Column(name = "username", length = 15)
	private String username;

	@Column(name = "password", length = 100)
	private String password;

	/**
	 * Stores the user's role (e.g., "Member", "Librarian", "Admin").
	 */
	@Column(name = "role_type", length = 45)
	private String roleType;

	/**
	 * Bridges the roleType field to Spring Security's GrantedAuthority collection.
	 * 
	 * @return A collection containing the user's authority.
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList(this.roleType);
	}

}
