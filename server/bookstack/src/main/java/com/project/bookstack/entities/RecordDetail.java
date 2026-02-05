package com.project.bookstack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Record Detail Entity
 * =========================================================================
 * Stores granular details for each book involved in a circulation transaction.
 * Tracks status (Rent/Return/Renew), due dates, and return status for
 * individual book IDs.
 */
@Entity
@Table(name = "record_detail_table", schema = "Bookstack")
@Data
@NoArgsConstructor
public class RecordDetail {

    /* ------------------ Primary Key ------------------ */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_detail_id")
    private Integer recordDetailId;

    /* ------------------ Relationships ------------------ */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "record_id",
        referencedColumnName = "record_id",
        foreignKey = @ForeignKey(name = "record_id")
    )
    private Record record;

    @Column(name = "book_id", nullable = false)
    private Integer bookId;

    /* ------------------ Other Columns ------------------ */

    @Column(name = "status", length = 10)
    private String status;

    @Column(name = "total_copies")
    private Integer totalCopies;

    @Column(name = "due_Date")
    private LocalDate dueDate;
    
    @Column(name = "returned")
    private Integer returned;
    
}
