package com.bookstack.messaging.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bookstack.messaging.client.AuthorizationClient;
import com.bookstack.messaging.dto.EmailDTO;


@Service
@Transactional
public class MessageService {
	
	@Autowired
	AuthorizationClient authorizationClient;
	
	@Autowired
	JavaMailSender javaMailSender;
	

	@Value("${bookstack.from.email}")
	public String fromEmailAddress;
	
	@KafkaListener(topics = "email-topic")
	public void sendEmail(EmailDTO emailDTO) {
			
		String email = emailDTO.getEmail();
		
		List<String> emails = authorizationClient.getEmails();
		
		for(String emailString: emails) {
			MimeMessagePreparator a = b -> {
				MimeMessageHelper c = new MimeMessageHelper(b);
				c.setFrom(fromEmailAddress);
				c.setTo(emailString);
				c.setSubject("News letter from Bookstack library");
				c.setText(email);
			};
			javaMailSender.send(a);
		}
		
	}
	
	
	
	
}
