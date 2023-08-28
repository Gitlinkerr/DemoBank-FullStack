package com.finance.demobank_v2.dto.response;

import com.finance.demobank_v2.bankingcore.Account;
import com.finance.demobank_v2.bankingcore.deposit.DepositStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DepositResponse {
    private Long depositId;
private Long accountId;
    private BigDecimal amount;
    @Builder.Default
    private DepositStatus status=DepositStatus.PENDING; // Can be PENDING, APPROVED, or REJECTED

}
