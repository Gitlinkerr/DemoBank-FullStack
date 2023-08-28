package com.finance.demobank_v2.fileManagement;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFile {
    private String fileName;
    private String type;
    private List<?> usersAlreadyRegistered;
    private String description;
}