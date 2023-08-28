package com.finance.demobank_v2.Util;

import com.finance.demobank_v2.dto.response.DownloadResponse;
import com.finance.demobank_v2.fileManagement.Document;

public class DtoMapper {
    public static DownloadResponse documentToDownloadResponse(Document document) {
        DownloadResponse dto = new DownloadResponse();
        dto.setDocumentId(document.getDocumentId());
        dto.setName(document.getName());
        dto.setDescription(document.getDescription());
        return dto;
    }
}
