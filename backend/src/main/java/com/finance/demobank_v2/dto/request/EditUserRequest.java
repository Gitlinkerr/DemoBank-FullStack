package com.finance.demobank_v2.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditUserRequest {
    private String newFirstname;
    private String newLastName;
    private String newPassword;
}
