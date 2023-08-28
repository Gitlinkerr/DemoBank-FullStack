package com.finance.demobank_v2.bankingcore.deposit;

import com.finance.demobank_v2.dto.request.DepositRequest;
import com.finance.demobank_v2.dto.response.DepositResponse;
import com.finance.demobank_v2.dto.response.PendingDepositsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bankingcore/deposits")
@RequiredArgsConstructor
public class DepositController {
    private final DepositService depositService;

    @PostMapping("/request")
    public ResponseEntity<String> requestDeposit(@RequestBody DepositRequest deposit) {
        depositService.createDepositRequest(deposit);
        return ResponseEntity.ok("Deposit request submitted.");
    }

    // Admin approves a deposit request
    @PostMapping("/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approveDeposit(@PathVariable Long id) {
        depositService.approveDepositRequest(id);
        return ResponseEntity.ok("Deposit request approved.");
    }

    // Admin rejects a deposit request
    @PostMapping("/reject/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> rejectDeposit(@PathVariable Long id) {
        depositService.rejectDepositRequest(id);
        return ResponseEntity.ok("Deposit request rejected.");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getdeposits/{accountId}")
    public ResponseEntity<List<DepositResponse>> getDepositsByAccountId(@PathVariable("accountId") Long accountId) {
        return ResponseEntity.ok(depositService.getDepositsByAccountId(accountId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getPendingDeposits")
    public ResponseEntity<List<PendingDepositsResponse>> getAllPendingDeposits() {
        return ResponseEntity.ok(depositService.getAllPendingDeposits());
    }



}

