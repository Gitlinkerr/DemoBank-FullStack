package com.finance.demobank_v2.bankingcore;


import com.finance.demobank_v2.dto.request.TransactionRequest;
import com.finance.demobank_v2.dto.response.BalanceOperationsResponse;
import com.finance.demobank_v2.dto.response.GetListOfAccounts;
import com.finance.demobank_v2.dto.response.TransferResponse;
import com.finance.demobank_v2.exceptions.InsufficientBalanceException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.finance.demobank_v2.user.UserRepository;

import javax.security.auth.login.AccountNotFoundException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bankingcore")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/GetBalanceAndOperations")
    public ResponseEntity<BalanceOperationsResponse> getBalanceOperations(
            @RequestParam("identifiant") Long request, Principal principal
    ) {
        return ResponseEntity.ok(accountService.accountBalanceAndOperations(request, principal));
    }

    @PostMapping("/fundTransfer")
    public ResponseEntity<TransferResponse> processTransfer(@RequestBody TransactionRequest request) {
        try {
            TransferResponse response = accountService.processTransfer(request);
            return ResponseEntity.ok(response);
        } catch (InsufficientBalanceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new TransferResponse("Insufficient balance"));
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new TransferResponse("Account not found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new TransferResponse("An error occurred"));
        }
    }



    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/listofaccounts")
    public ResponseEntity<List<GetListOfAccounts>> getListOfAccounts(
    ) {
        return ResponseEntity.ok(accountService.getListofaccounts());
    }






}
