package com.bookstack.auth.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bookstack.auth.dto.AllStaffDto;
import com.bookstack.auth.entities.User;
import java.util.List;

/**
 * User Repository
 * =========================================================================
 * Data Access Object for User entities.
 * Managed by Spring Data JPA to provide standard CRUD operations
 * and custom search capabilities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Finds users by their unique login username.
     * 
     * @param username The username to search for.
     * @return List of matching users (typically contains 0 or 1 result).
     */
    public List<User> findByUsername(String username);

    /**
     * Performs a fuzzy search across multiple user fields.
     * Searches by username (anywhere), email (starts with), or name (anywhere).
     * 
     * @param keyword  The search term.
     * @param pageable Pagination and sorting information.
     * @return List of matched users.
     */
    @Query("""
                SELECT u FROM User u
                WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(u.email) LIKE LOWER(CONCAT(:keyword, '%'))
                   OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);

    /**
     * Checks if a specific username is already taken.
     */
    public boolean existsByUsername(String username);

    /**
     * Checks if a specific email address is already registered.
     */
    public boolean existsByEmail(String email);

    /**
     * Retrieves all users belonging to a specific role.
     * 
     * @param roleType The role name (e.g., "Member", "Librarian").
     * @return List of users with that role.
     */
    List<User> findByRoleType(String roleType);

}