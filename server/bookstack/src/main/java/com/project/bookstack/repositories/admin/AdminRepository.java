package com.project.bookstack.repositories.admin;


import java.time.LocalDate;
import java.util.List;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bookstack.dto.admin.AdminDetailDto;
import com.project.bookstack.dto.admin.DueBookDto;
import com.project.bookstack.entities.Staff;

import jakarta.transaction.Transactional;



@Repository
public interface AdminRepository extends JpaRepository<Staff,Integer>{
	
	 @Query("""
		        SELECT new com.project.bookstack.dto.admin.DueBookDto(rd.totalCopies, rd.dueDate)
		        FROM RecordDetail rd
		        JOIN rd.record r
		        WHERE r.member.userId = :memberId
		          AND rd.dueDate < :date
		          AND rd.returned = 0
		    """)
		    List<DueBookDto>findDueBooksByMember(
		            @Param("memberId") Integer memberId,
		            @Param("date") LocalDate date
		    );
	 
	 		@Query(value = "SELECT DISTINCT member_id FROM record_table", nativeQuery = true)
	 		List<Integer> findDistinctMemberIdsNative();
}
