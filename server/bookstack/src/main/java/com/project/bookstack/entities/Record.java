package com.project.bookstack.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Record_table", schema = "Bookstack")
public class Record {

    /* ------------------ Primary Key ------------------ */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Integer recordId;

    /* ------------------ Relationships ------------------ */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "member_id",
        referencedColumnName = "user_id",
        foreignKey = @ForeignKey(name = "member_record")
    )
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "staff_id",
        referencedColumnName = "user_id",
        foreignKey = @ForeignKey(name = "staff_record")
    )
    private Staff staff;

    /* ------------------ Other Columns ------------------ */

    @Column(name = "date")
    private LocalDate date;
}
