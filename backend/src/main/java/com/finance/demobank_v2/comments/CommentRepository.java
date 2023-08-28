package com.finance.demobank_v2.comments;

import com.finance.demobank_v2.bankingcore.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByAccount(Account account);
}
