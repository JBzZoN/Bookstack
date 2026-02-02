package com.project.bookstack.dto;

import lombok.Data;

@Data
public class RentRenewReturnRecordDTO {

    private String status;   // Rent | Renew | Return

    private Integer bookId;

    private Integer copies;
}