package com.finance.demobank_v2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.finance.demobank_v2.user.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String id;
    private String token;
    private String firstName;
    private String lastName;
    private String email;
    private String description;
    private Role role;
}
