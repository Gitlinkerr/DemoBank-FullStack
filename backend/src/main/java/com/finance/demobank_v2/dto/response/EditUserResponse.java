package com.finance.demobank_v2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditUserResponse {
    private String newFirstname;
    private String newLastName;
    private String newPassword;
}
