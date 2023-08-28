package com.finance.demobank_v2.fileManagement;


import com.finance.demobank_v2.bankingcore.AccountRepository;
import com.finance.demobank_v2.exceptions.FileStorageException;
import com.finance.demobank_v2.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final AccountRepository accountRepository;

    @Value("${file.upload-dir}")
    private String UPLOAD_DIR;

    private final ResourceLoader resourceLoader;

    public Resource loadFileAsResource(String fileName) {
        try {
            String fullPath = UPLOAD_DIR + "/" + fileName;
            Resource resource = resourceLoader.getResource("file:" + fullPath);
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
    public ResponseFile storeFile(MultipartFile file, String filename, String fileDescription, Long uploaderId) {
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            if(originalFileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + originalFileName);
            }
            Path targetLocation = Paths.get(UPLOAD_DIR + originalFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            var savedDoc = Document.builder()
                    .account(accountRepository.getReferenceById(uploaderId))
                    .filePath(targetLocation.toString())
                    .description(fileDescription)
                    .name(filename)
                    .build();

            documentRepository.save(savedDoc);

            return ResponseFile.builder().fileName(originalFileName).type(file.getContentType()).build();
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }
    public Resource loadFileAsResource(Long documentId) throws MalformedURLException {
        Document doc = documentRepository.findById(documentId).orElseThrow(() -> new NotFoundException("File not found with id " + documentId));

        Path filePath = Paths.get(doc.getFilePath()).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists()) {
            return resource;
        } else {
            throw new NotFoundException("File not found " + doc.getName());
        }
    }
}

