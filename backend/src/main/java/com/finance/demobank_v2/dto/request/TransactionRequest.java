package com.finance.demobank_v2.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {
    private Long sourceAccountId;
    private Long targetAccountId;
    private BigDecimal amount;
}
