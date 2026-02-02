package com.project.bookstack.dto;

import java.util.List;

import lombok.Data;

@Data
public class RentRenewReturnRequestDTO {

    private Integer staffId;

    private Integer memberId;

    private List<RentRenewReturnRecordDTO> records;
}