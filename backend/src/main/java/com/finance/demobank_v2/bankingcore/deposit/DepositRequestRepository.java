package com.finance.demobank_v2.bankingcore.deposit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRequestRepository extends JpaRepository<Deposit, Long> {
    List<Deposit> findByAccountId(Long userId);
    List<Deposit> findAllByStatus(DepositStatus depositStatus);

}
