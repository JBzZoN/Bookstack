package com.project.bookstack.dto.member;

public record MemberLimitsDTO(
    Integer renewCount,
    Integer renewalLimit,
    String membershipType
) {}
