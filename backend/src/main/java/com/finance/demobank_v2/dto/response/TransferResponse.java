package com.finance.demobank_v2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TransferResponse {
    private String message;
    private BigDecimal senderUpdatedBalance;

    public TransferResponse(String transferMessage) {
        this.message=transferMessage;
    }
}
