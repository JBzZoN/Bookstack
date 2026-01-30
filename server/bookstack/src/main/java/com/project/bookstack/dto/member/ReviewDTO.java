package com.project.bookstack.dto.member;

import java.time.LocalDateTime;

public record ReviewDTO (
        String userName,
        String userAvatar,
        Integer rating,
        String comment,
        LocalDateTime createdAt
) {}
