package com.project.bookstack.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.DueBookDto;
import com.project.bookstack.entities.RecordDetail;

/**
 * Staff Record Detail Repository
 * =========================================================================
 * Manages granular circulation details (line items for Rent/Return).
 * Provides queries for fetching overdue books (fines) and identifying active
 * rentals for renewal.
 */
@Repository
public interface StaffRecordDetailRepository extends JpaRepository<RecordDetail, Integer> {

    List<RecordDetail> findByRecord_RecordId(Integer recordId);

    List<RecordDetail> findByBookId(Long bookId);

    List<RecordDetail> findByStatus(String status);

    @Query("select new com.project.bookstack.dto.DueBookDto(r.dueDate, r.totalCopies, r.bookId) from RecordDetail r where r.record.member.userId=:memberId"
            + " and r.dueDate < :now and r.returned=0 and r.status='Rent'")
    List<DueBookDto> getFineDetails(@Param("memberId") Integer memberId, @Param("now") LocalDate now);

    @Query("select r from RecordDetail r where r.record.member.userId=:memberId"
            + " and r.returned=0 and r.status='Rent' and r.bookId=:bookId")
    List<RecordDetail> getReturnDataForRenew(@Param("memberId") Integer memberId, @Param("bookId") Integer bookId);
}