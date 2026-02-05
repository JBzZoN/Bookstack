package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Book Entity
 * =========================================================================
 * Represents a logical book record in the library system.
 * Managed by staff members, it contains metadata, inventory counts,
 * and tracking info for physical copies.
 */
@Entity
@Table(name = "book_table", schema = "Bookstack")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_id")
	private Integer bookId;

	@Column(name = "isbn")
	private String isbn;

	@Column(name = "book_image")
	private String image;

	@Column(name = "title", length = 25)
	private String title;

	@Column(name = "author", length = 25)
	private String author;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "publisher", length = 45)
	private String publisher;

	@Column(name = "action", length = 15)
	private String action;

	@Column(name = "action_date")
	private LocalDate actionDate;

	@Column(name = "number_of_copies")
	private Integer numberOfCopies;

	@Column(name = "number_of_copies_remaining")
	private Integer numberOfCopiesRemaining;

	/* ------------------ Relationship ------------------ */

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "staff_id"))
	private Staff staff;

}
