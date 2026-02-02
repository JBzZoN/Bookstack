package com.project.bookstack.scheduled;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.project.bookstack.entities.Member;
import com.project.bookstack.repositories.StaffMemberRepository;
import com.project.bookstack.services.StaffService;

@Component
public class RenewPerMonth {

//	@Scheduled(cron = "0 0 0 1 * *")
//	public void printOut() {
//		System.out.println("Hi");
//	}
	
	@Autowired
	StaffService staffService;
	
	// renew count of every member will be reset after every month
	@Scheduled(cron = "0 0 0 1 * *")
	public void resetRenew() {
		staffService.resetRenew();
	}
	
	
	
}
