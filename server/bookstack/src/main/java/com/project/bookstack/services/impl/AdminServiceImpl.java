package com.project.bookstack.services.impl;

import java.time.LocalDate;



import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
//import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

//import org.springframework.kafka.core.KafkaTemplate;

import com.project.bookstack.dto.EmailDTO;
import com.project.bookstack.dto.admin.AddAuthStaffDto;
import com.project.bookstack.dto.admin.AddStaffDto;
import com.project.bookstack.dto.admin.AllBookDto;
import com.project.bookstack.dto.admin.AllStaffDto;
import com.project.bookstack.dto.admin.DueBookDto;
import com.project.bookstack.dto.admin.EditStaffDto;
import com.project.bookstack.dto.admin.EditStaffSentDto;
import com.project.bookstack.dto.admin.ResultMemberDto;
import com.project.bookstack.dto.admin.ResultStaffDto;
import com.project.bookstack.dto.admin.UserId;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.Staff;
import com.project.bookstack.repositories.AdminMemberRepository;
import com.project.bookstack.repositories.AdminRepository;
import com.project.bookstack.services.AdminService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

   

	private final BookClientService bookClientService;
	private final AdminClientService adminClientService;
	private final AdminRepository adminRepository;
	private final AdminMemberRepository memberRepository;
	
	private final JavaMailSender javaMailSender;
	
	@Value("${bookstack.from.email}")
	public String fromEmailAddress;

	//private final  KafkaTemplate<String, EmailDTO> kafkaTemplate;

	
	public List<AllBookDto> getAllBooks() {
		
		return bookClientService.getAllBooks();
		
		
	}

	public List<ResultStaffDto> getallstaff() {
		List<ResultStaffDto>stafflist=new ArrayList<>();
		List<AllStaffDto>list1=adminClientService.getAllStaff();
		for(AllStaffDto list:list1) {
			Optional<Staff> optionalstaff=adminRepository.findById(list.getUserId());
			Staff staff=optionalstaff.get();
			ResultStaffDto rs=new ResultStaffDto();
			rs.setUserId(list.getUserId());
			rs.setName(list.getName());
			rs.setEmail(list.getEmail());
			rs.setPhone(list.getPhone());
			rs.setAddress(list.getAddress());
			rs.setDob(list.getDob());
			rs.setUsername(list.getUsername());
			rs.setSalary(staff.getSalary());
			rs.setDateHired(staff.getDateHired());
			rs.setStatus(staff.getStatus());
			
			stafflist.add(rs);
				
		}
		return stafflist;
	}

	public List<ResultMemberDto> getallmember() {
		
		List<ResultMemberDto>memberlist=new ArrayList<>();
		
		List<AllStaffDto>list1=adminClientService.getAllmember();
		for(AllStaffDto list:list1) {
			System.out.println(list.getUserId());
			Optional<Member>optionalmember=memberRepository.findById(list.getUserId());
			Member member=optionalmember.get();
			ResultMemberDto rs=new ResultMemberDto();
			rs.setUserId(list.getUserId());
			rs.setName(list.getName());
			rs.setEmail(list.getEmail());
			rs.setPhone(list.getPhone());
			rs.setAddress(list.getAddress());
			rs.setDob(list.getDob());
			rs.setUsername(list.getUsername());
			rs.setMembershipType(member.getMembershipType());
			rs.setMemberStart(member.getMemberStart());
			rs.setMemberEnd(member.getMemberEnd());
			
			memberlist.add(rs);
	}
		return memberlist;
	}

	public String addmember(AddStaffDto addStaffDto) {
		AddAuthStaffDto add=new AddAuthStaffDto();
		add.setName(addStaffDto.getName());
		add.setEmail(addStaffDto.getEmail());
		add.setPhone(addStaffDto.getPhone());
		add.setAddress(addStaffDto.getAddress());
		add.setUsername(addStaffDto.getUsername());
		add.setPassword(addStaffDto.getPassword());
		add.setRoleType(addStaffDto.getRoleType());
		
		
		Integer user_id=adminClientService.addstaff(add);
		
		 Staff s=new Staff();
		 s.setUserId(user_id);
		 s.setStatus(addStaffDto.getStatus());
		 s.setSalary(addStaffDto.getSalary());
		 s.setDateHired(addStaffDto.getDateHired());
		 try {
			 adminRepository.save(s);
			 return "saved";
		} catch (Exception e) {
			e.printStackTrace();
			return "not saved";
		}
				
	}

	public String editstaff(EditStaffDto editStaffDto) {
		try {
			
			Staff staff=adminRepository.findById(editStaffDto.getUserId()).get();
			staff.setSalary(editStaffDto.getSalary());
			staff.setStatus(editStaffDto.getStatus());
			adminRepository.save(staff);
			
			
			EditStaffSentDto editStaffSentDto=new EditStaffSentDto();
			editStaffSentDto.setUserId(editStaffDto.getUserId());
			editStaffSentDto.setName(editStaffDto.getName());
			editStaffSentDto.setEmail(editStaffDto.getEmail());
			editStaffSentDto.setPhone(editStaffDto.getPhone());
			editStaffSentDto.setAddress(editStaffDto.getAddress());
			editStaffSentDto.setDob(editStaffDto.getDob());
			editStaffSentDto.setUsername(editStaffDto.getUsername());
			editStaffSentDto.setPassword(editStaffDto.getPassword());
			String result=adminClientService.editstaff(editStaffSentDto);
			return result;
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return "not edited";
		}
		
	}

	public Integer calculatefine(UserId user_id) {
		
		List<DueBookDto>list=adminRepository.findDueBooksByMember(user_id.getUserId(),LocalDate.now());
		Integer total_payment=0;
		for (DueBookDto dueBookDto : list) {
			LocalDate date=dueBookDto.getDueDate();
			 long days = ChronoUnit.DAYS.between(date,LocalDate.now());
			 total_payment=(int) (total_payment +(days*dueBookDto.getTotalCopies()));
		}
		return total_payment*5;
	}

	public String sendfine(EmailDTO emailDTO) {
		//kafkaTemplate.send("send-fine", emailDTO);
		String email = emailDTO.getEmail();
		MimeMessagePreparator a = b -> {
				MimeMessageHelper c = new MimeMessageHelper(b);
				c.setFrom(fromEmailAddress);
				//System.out.println(emailDTO.getEmailId());
				c.setTo(emailDTO.getEmailId());
				c.setSubject("News letter from Bookstack library");
				c.setText(email);
			};
			javaMailSender.send(a);
		return "emailsent";
	}
	
	
	

	

}
