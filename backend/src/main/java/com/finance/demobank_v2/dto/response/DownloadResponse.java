package com.finance.demobank_v2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DownloadResponse {
    private Long documentId;
    private String name;
    private String description;

}
