package com.finance.demobank_v2.fileManagement;


import com.finance.demobank_v2.Util.DtoMapper;
import com.finance.demobank_v2.dto.response.DownloadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping("/api/v1/Files")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService docService;
    private final DocumentRepository docRepository;
    @PostMapping(value = "/uploadFile", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseFile> uploadFile(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("file_name") String fileName,
                                                   @RequestParam("file_description") String fileDescription,
                                                   @RequestParam("uploader_id") Long uploaderId) {
        return ResponseEntity.ok(docService.storeFile(file,fileName,fileDescription, uploaderId));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String documentId) {
        Resource resource = docService.loadFileAsResource(documentId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/getAllFiles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DownloadResponse>> getAllDocuments() {
        List<Document> documents = docRepository.findAll();
        List<DownloadResponse> dtos = documents.stream()
                .map(DtoMapper::documentToDownloadResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

}