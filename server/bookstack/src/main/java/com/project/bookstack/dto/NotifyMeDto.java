package com.project.bookstack.dto;

import lombok.Data;

/**
 * Notify Me DTO
 * =========================================================================
 * Captures user requests to be notified when an out-of-stock book becomes
 * available.
 */
@Data
public class NotifyMeDto {
    private Long bookId;
    private String email;
}
