package com.finance.demobank_v2.bankingcore;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long senderId;
    private Long receiverId;
    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    private Date createdAt;

}