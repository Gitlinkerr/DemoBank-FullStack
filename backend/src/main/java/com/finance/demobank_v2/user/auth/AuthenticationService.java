package com.finance.demobank_v2.user.auth;


import com.finance.demobank_v2.bankingcore.Account;
import com.finance.demobank_v2.config.JwtService;
import com.finance.demobank_v2.dto.request.AuthenticationRequest;
import com.finance.demobank_v2.dto.request.RegisterRequest;
import com.finance.demobank_v2.dto.response.AuthenticationResponse;
import com.finance.demobank_v2.dto.response.RegistrationResponse;
import com.finance.demobank_v2.user.Role;
import com.finance.demobank_v2.user.User;
import com.finance.demobank_v2.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        // Check if user is soft-deleted
        if (user.isDeleted()) {
            throw new RuntimeException("The user is deleted and cannot be authenticated.");
        }
        var jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .firstName(user.getFirstname())
                    .lastName(user.getLastname())
                    .id(String.valueOf(user.getId()))
                    .email(user.getEmail())
                    .role( user.getRole())
                    .build();

    }

    @Transactional
    public RegistrationResponse register(RegisterRequest request) {
        if(!repository.existsByEmail(request.getEmail())){
            Role userRole = Role.USER;

            if(request.getRole() != null && request.getRole().equals("ADMIN")) {
                userRole = Role.ADMIN;
            }

            User user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(userRole)
                    .build();

            Account newAccount = new Account();
            newAccount.setBalance(new BigDecimal("0.00"));

            newAccount.setUser(user);
            user.getAccountList().add(newAccount);

            User savedUser = repository.save(user);

            return RegistrationResponse.builder()
                    .firstName(savedUser.getFirstname())
                    .id(String.valueOf(savedUser.getId()))
                    .email(savedUser.getEmail())
                    .role(userRole)
                    .build();
        }else return null;}

}
