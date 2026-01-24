package com.project.bookstack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookstack.entities.RecordDetail;

@Repository
public interface StaffRecordDetailRepository extends JpaRepository<RecordDetail, Integer> {

    List<RecordDetail> findByRecord_RecordId(Integer recordId);

    List<RecordDetail> findByBook_BookId(Long bookId);

    List<RecordDetail> findByStatus(String status);
}