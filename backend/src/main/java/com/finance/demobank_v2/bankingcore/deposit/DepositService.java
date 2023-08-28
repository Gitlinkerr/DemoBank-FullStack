package com.finance.demobank_v2.bankingcore.deposit;

import com.finance.demobank_v2.bankingcore.*;
import com.finance.demobank_v2.dto.request.DepositRequest;
import com.finance.demobank_v2.dto.response.DepositResponse;
import com.finance.demobank_v2.dto.response.PendingDepositsResponse;
import com.finance.demobank_v2.exceptions.NotFoundException;
import com.finance.demobank_v2.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepositService {

    private  final DepositRequestRepository depositRequestRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;


    public void createDepositRequest(DepositRequest deposit) {
      var depositBuild=  Deposit.builder()
                        .account(accountRepository.findById(deposit.getAccountid()).orElseThrow())
                                .amount(deposit.getAmount())
                                        .build();
        depositRequestRepository.save(depositBuild);
    }
    public void approveDepositRequest(Long id) {
        Deposit request = depositRequestRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Deposit with ID " + id + " was not found."));
        request.setStatus(DepositStatus.APPROVED);
        Account account = request.getAccount();
        account.setBalance(account.getBalance().add(request.getAmount()));
        var transaction = Transaction.builder().amount(request.getAmount())
                        .createdAt(new Date())
                .type(TransactionType.DEPOSIT)
                                .senderId(account.getId())
                                        .receiverId(account.getId())
                                                .build();


        depositRequestRepository.save(request);
        transactionRepository.save(transaction);
    }

    public void rejectDepositRequest(Long id) {
        Deposit request = depositRequestRepository.findById(id).orElseThrow();
        request.setStatus(DepositStatus.REJECTED);
        depositRequestRepository.save(request);
    }

    public List<DepositResponse> getDepositsByAccountId(Long accountId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account not found"));
        User userForGivenAccountId = account.getUser();

        if(!currentUser.getId().equals(userForGivenAccountId.getId())
                && !auth.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            throw new AccessDeniedException("You don't have permission to access this resource.");
        }
        List<Deposit> deposits = depositRequestRepository.findByAccountId(accountId);

        return deposits.stream()
                .map(deposit -> DepositResponse.builder()
                        .depositId(deposit.getId())
                        .accountId(deposit.getAccount().getId())
                        .amount(deposit.getAmount())
                        .status(deposit.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    public List<PendingDepositsResponse> getAllPendingDeposits() {
        List<Deposit> pendingDeposits = depositRequestRepository.findAllByStatus(DepositStatus.PENDING);

        return pendingDeposits.stream()
                .map(deposit -> new PendingDepositsResponse(deposit.getId(), deposit.getAmount()))
                .collect(Collectors.toList());
    }}
