# 🔐 Technical Deep Dive: Spring Security & Auth

> **Stateless JWT Authentication**
>
> **Architecture**: Token-Based.
> **Key Tech**: Spring Security 6, JJWT (Java JWT), BCrypt.

---

## 🛡️ 1. The Security Architecture

We split security into two distinct roles:
1.  **Auth Server (`:9090`)**: The **Identity Provider (IdP)**. It owns the user database and mints tokens.
2.  **Resource Servers (Core/Gateway)**: They verify tokens but do not issue them.

### 🔄 The Login Flow
1.  User sends `POST /auth/login` (username/password).
2.  Auth Server verifies hash (`BCrypt`).
3.  Auth Server generates a **Signed JWT** containing:
    *   `sub`: username
    *   `roles`: [Admin, Member]
    *   `exp`: Expiry (10 hours)
4.  User receives `{ "token": "eyJhbG..." }`.

---

## 👮 2. Security Configuration (`SecurityConfig.java`)

We disable standard Session Management because we are stateless (REST API).

**File**: `server/auth-server/.../SecurityConfiguration.java`

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable()) // Disable CSRF for non-browser APIs
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/login", "/auth/register").permitAll() // Public
            .requestMatchers("/auth/validate").permitAll() // Used by Gateway
            .anyRequest().authenticated() // Everything else needs token
        )
        .build();
}
```

---

## 🧱 3. The JWT Filter (`JwtFilter.java`)

Every request to a protected route goes through this filter *before* reaching the controller.

**Logic**:
1.  **Intercept**: Check header `Authorization: Bearer <token>`.
2.  **validate**: key verify logic.
3.  **Context**: If valid, inject `UsernamePasswordAuthenticationToken` into `SecurityContextHolder`.

```java
@Component
public class JwtFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
        String header = req.getHeader("Authorization");
        
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            
            if (jwtService.validateToken(token)) {
                String user = jwtService.extractUsername(token);
                // Manually authenticate the user in this request scope
                SecurityContextHolder.getContext().setAuthentication(...);
            }
        }
        
        chain.doFilter(req, res);
    }
}
```

---

## 🚪 4. Gateway Security

The **API Gateway** (`:7070`) is the first line of defense.

*   **Public Routes**: `/auth/**`, `/book/search` (Catalog is public).
*   **Protected Routes**: `/member/**`, `/admin/**`.

The Gateway does a "Pre-Flight" check by calling the Auth Server (`/auth/validate`) before forwarding the request to the Core Service. This ensures the Core Service isn't bombarded with invalid requests.

---

## 🔑 5. Password Hashing

We strictly use **BCrypt** with strength `10`.

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

*   **Input**: `password123`
*   **Stored DB**: `$2a$10$wS....` (Salted & Hashed)
*   **Verification**: `encoder.matches(raw, hashed)`
