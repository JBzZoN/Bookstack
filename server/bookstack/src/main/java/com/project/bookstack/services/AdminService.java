package com.project.bookstack.services;

import java.util.List;



import org.springframework.stereotype.Service;

import com.project.bookstack.dto.AdminDetailDto;
import com.project.bookstack.dto.MemberDetailsDto;
import com.project.bookstack.dto.StaffDetailDto;
import com.project.bookstack.dto.StaffUpdateDto;
import com.project.bookstack.dto.StaffUserDto;
import com.project.bookstack.entities.Staff;
import com.project.bookstack.entities.User;
import com.project.bookstack.repositories.AdminRepository;
import com.project.bookstack.repositories.MemberRepository;
import com.project.bookstack.repositories.StaffRepository;
import com.project.bookstack.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@Setter
@Getter
@AllArgsConstructor
@Transactional
public class AdminService {

	private final AdminRepository adminRepository;
	

    private final UserRepository userRepository;
    private final StaffRepository staffRepository;
    
    private final MemberRepository memberRepository;
	
	public  List<AdminDetailDto> getAllBooks(){
		// TODO Auto-generated method stub
		return adminRepository.getAllBooks();
	}

	public List<StaffDetailDto> getallstaff() {
		// TODO Auto-generated method stub
		return adminRepository.getAllStaff();
	}

	
	
	  @Transactional
	    public void saveStaffUser(StaffUserDto dto) {

	        // Save into user_table
	        User user = new User();
	        user.setName(dto.getName());
	        user.setEmail(dto.getEmail());
	        user.setPhone(dto.getPhone());
	        user.setAddress(dto.getAddress());
	        user.setDob(dto.getDob());
	        user.setUsername(dto.getUsername());
	        user.setPassword(dto.getPassword());
	        user.setRoleType(dto.getRoleType());

	        User savedUser = userRepository.save(user);

	        // Save into staff_table
	        Staff staff = new Staff();
	        staff.setUser(savedUser); 
	        staff.setSalary(dto.getSalary());
	        staff.setDateHired(dto.getDateHired());
	        staff.setStatus(dto.getStatus());

	        staffRepository.save(staff);
	    }
	  
	  
	  @Transactional
	    public void updateStaffUser(StaffUpdateDto dto) {

	        // 1️⃣ Fetch User
	        User user = userRepository.findById(dto.getUserId())
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        // 2️⃣ Update User fields
	        user.setName(dto.getName());

	        // 3️⃣ Fetch Staff using shared PK
	        Staff staff = staffRepository.findById(dto.getUserId())
	                .orElseThrow(() -> new RuntimeException("Staff not found"));

	        // 4️⃣ Update Staff fields
	        staff.setSalary(dto.getSalary()); // payment
	        staff.setStatus(dto.getStatus());

	        // 5️⃣ Save (optional, due to persistence context)
	        userRepository.save(user);
	        staffRepository.save(staff);
	    }
	  
	  

	    public List<MemberDetailsDto> getAllMembers() {
	        return memberRepository.getAllMembers();
	    }
	

}


