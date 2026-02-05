package com.bookstack.auth.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ModelMapper Configuration
 * =========================================================================
 * Configures the central ModelMapper bean used for converting Entities to
 * DTOs and vice-versa.
 */
@Configuration
public class ModelMapperConfig {

    /**
     * Initializes and configures the ModelMapper engine.
     * Sets field matching to true and allows access to private fields for
     * seamless mapping between complex objects.
     * 
     * @return Configured ModelMapper instance.
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                .setSkipNullEnabled(true);

        return modelMapper;
    }
}
