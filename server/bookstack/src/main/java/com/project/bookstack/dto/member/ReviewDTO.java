package com.project.bookstack.dto.member;

import java.time.LocalDateTime;

public record ReviewDTO(
                Integer userId,
                Integer rating,
                String comment,
                LocalDateTime createdAt,
                String userName) {
}
