package com.finance.demobank_v2.fileManagement;

import com.finance.demobank_v2.bankingcore.Account;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentId;

    private String name;
    @ManyToOne(fetch = FetchType.EAGER)
    private Account account;

    private String description;

    @Column
    private String filePath;

}
