<<<<<<< HEAD
package com.bookstack.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "user_table")
@Data
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

	@Column(name = "role_type", length = 45)
	private String roleType;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return  AuthorityUtils.createAuthorityList(this.roleType);
	}

}

=======
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

	@Column(name = "role_type", length = 45)
	private String roleType;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return  AuthorityUtils.createAuthorityList(this.roleType);
	}

}

>>>>>>> origin/josh
