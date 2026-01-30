package com.project.bookstack.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "record_Detail_table", schema = "Bookstack")
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
    private Integer book;

    /* ------------------ Other Columns ------------------ */

    @Column(name = "status", length = 10)
    private String status;

    @Column(name = "total_copies")
    private Integer totalCopies;

    @Column(name = "due_Date")
    private LocalDate dueDate;
}
