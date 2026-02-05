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

import com.bookstack.messaging.client.AuthorizationClient;
import com.bookstack.messaging.dto.EmailDTO;

/**
 * Message Service
 * =========================================================================
 * Handles mass communication tasks, specifically the library newsletter.
 * Listens for email events via Kafka and broadcasts messages to all registered
 * users.
 */
@Service
@Transactional
public class MessageService {

	@Autowired
	private AuthorizationClient authorizationClient;

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${bookstack.from.email}")
	private String fromEmailAddress;

	/**
	 * Kafka listener for 'email-topic'.
	 * Broadcasts the received message content to all user emails fetched from
	 * the Auth Service.
	 * 
	 * @param emailDTO Contains the body of the email to be sent.
	 */
	@KafkaListener(topics = "email-topic")
	public void sendEmail(EmailDTO emailDTO) {

		String content = emailDTO.getEmail();
		List<String> recipients = authorizationClient.getEmails();

		for (String recipient : recipients) {
			MimeMessagePreparator preparator = mimeMessage -> {
				MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
				helper.setFrom(fromEmailAddress);
				helper.setTo(recipient);
				helper.setSubject("Newsletter from Bookstack library");
				helper.setText(content);
			};
			javaMailSender.send(preparator);
		}
	}
}
