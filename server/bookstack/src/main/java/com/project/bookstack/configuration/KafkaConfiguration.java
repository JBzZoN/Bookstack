package com.project.bookstack.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfiguration {
	
	@Bean
	public NewTopic myNewEmailTopic() {
		return TopicBuilder
				.name("email-topic")
				.build();
	}
	
}
