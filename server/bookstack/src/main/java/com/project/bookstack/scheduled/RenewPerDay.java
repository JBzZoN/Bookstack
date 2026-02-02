package com.project.bookstack.scheduled;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.project.bookstack.services.AdminService;
import com.project.bookstack.services.StaffService;

@Component
public class RenewPerDay {

//	@Scheduled(cron = "*/3 * * * * *")
//	public void printOut() {
//		System.out.println("Hi");
//	}
	
	@Autowired
	AdminService adminService;
	

	//@Scheduled(cron = "*/3 * * * * *")
	@Scheduled(cron = "0 0 0 * * *")
	public void resetRenew() {
		adminService.sendfinetoall();
	}
}
