package com.finance.demobank_v2.bankingcore;

import com.finance.demobank_v2.comments.Comment;
import com.finance.demobank_v2.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private BigDecimal balance= BigDecimal.valueOf(0);
    @Builder.Default
    @OneToMany(fetch = FetchType.EAGER)
    private List<Transaction> transactions=new ArrayList<>();
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Comment> comment;


    public Account() { }

    public void setId(String id) {
        this.id = Long.parseLong(id);
    }

}