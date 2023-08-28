package com.finance.demobank_v2.bankingcore;


import com.finance.demobank_v2.comments.Comment;
import com.finance.demobank_v2.comments.CommentRepository;
import com.finance.demobank_v2.dto.request.TransactionRequest;
import com.finance.demobank_v2.dto.response.BalanceOperationsResponse;
import com.finance.demobank_v2.dto.response.GetListOfAccounts;
import com.finance.demobank_v2.dto.response.TransferResponse;
import com.finance.demobank_v2.exceptions.InsufficientBalanceException;
import com.finance.demobank_v2.exceptions.NotFoundException;
import com.finance.demobank_v2.user.User;
import com.finance.demobank_v2.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.login.AccountNotFoundException;
import java.security.Principal;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    public BalanceOperationsResponse accountBalanceAndOperations(Long number, Principal principal) {
        User currentUser = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NotFoundException("Logged-in user not found"));

        Account account = accountRepository.findById(number)
                .orElseThrow(() -> new NotFoundException("Account not found"));
        User userForGivenAccountId = account.getUser();

        Collection<? extends GrantedAuthority> authorities = currentUser.getAuthorities();
        if(!currentUser.getId().equals(userForGivenAccountId.getId())
                && authorities.stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new AccessDeniedException("You don't have permission to access this resource.");
        }
        List<Transaction> transactions = transactionRepository.findBySenderId(account.getId());
        if(account != null) {
            return BalanceOperationsResponse.builder()
                    .balance(account.getBalance())
                    .transactions(transactions)
                    .build();
        }
        return null;
    }


    @Transactional
    public TransferResponse processTransfer(TransactionRequest request) throws AccountNotFoundException {
        Account sender = accountRepository.findById(request.getSourceAccountId())
                .orElseThrow(() -> new AccountNotFoundException("Sender account not found"));
        Account receiver = accountRepository.findById(request.getTargetAccountId())
                .orElseThrow(() -> new AccountNotFoundException("Receiver account not found"));
        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException("Sender has insufficient balance");
        }
        sender.setBalance(sender.getBalance().subtract(request.getAmount()));
        receiver.setBalance(receiver.getBalance().add(request.getAmount()));

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .createdAt(new Date())
                .type(TransactionType.TRANSFER)
                .receiverId(request.getTargetAccountId())
                .senderId(request.getSourceAccountId())
                .build();
        transactionRepository.save(transaction);
        accountRepository.save(sender);
        accountRepository.save(receiver);

        return new TransferResponse("Transfer completed successfully");
    }
    public List<GetListOfAccounts> getListofaccounts() {
        List<Account> allAccounts = accountRepository.findAll();
        return allAccounts.stream().map(account -> {
            User user = account.getUser();
            List<Transaction> transactions = transactionRepository.findBySenderId(account.getId());
            List<Comment> comments= commentRepository.findAllByAccount(account);

            return GetListOfAccounts.builder()
                    .accountId(account.getId())
                    .balance(account.getBalance())
                    .email(user.getEmail())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .role(user.getRole())
                    .transactions(transactions)
                    .comments(comments.stream().map(Comment::getMessage).toList())
                    .build();
        }).collect(Collectors.toList());
    }
}
