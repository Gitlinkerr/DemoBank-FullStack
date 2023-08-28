package com.finance.demobank_v2.dto.response;

import com.finance.demobank_v2.bankingcore.Transaction;
import com.finance.demobank_v2.user.Role;
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

public class GetListOfAccounts {
    private Long accountId;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
    private BigDecimal balance;
    private List<Transaction> transactions;
    private List<String> comments;

}
