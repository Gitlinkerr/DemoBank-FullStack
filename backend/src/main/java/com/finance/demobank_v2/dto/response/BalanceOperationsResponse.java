package com.finance.demobank_v2.dto.response;


import com.finance.demobank_v2.bankingcore.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BalanceOperationsResponse {
    private BigDecimal balance;
    private List<Transaction> transactions;
}