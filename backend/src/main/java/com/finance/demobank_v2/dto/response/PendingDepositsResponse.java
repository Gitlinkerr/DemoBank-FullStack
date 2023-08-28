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
public class PendingDepositsResponse {
    private Long depositId;
    private BigDecimal amount;
}
