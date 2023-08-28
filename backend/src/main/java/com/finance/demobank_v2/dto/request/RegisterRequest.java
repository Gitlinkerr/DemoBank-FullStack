package com.finance.demobank_v2.dto.request;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotEmpty(message = "Email cannot be null")
    private String email;

    @NotEmpty(message = "First name cannot be null")
    @Size(min=1, max = 50, message = "First name should be between 1 and 50 characters")
    private String firstname;

    @NotEmpty(message = "Last name cannot be null")
    @Size(min = 1, max = 50, message = "Last name should be between 1 and 50 characters")
    private String lastname;

    @NotEmpty(message = "Password cannot be null")
    @Size(min = 12, max = 100, message = "Password should be between 12 and 100 characters")
    private String password;

    private String role;
}
