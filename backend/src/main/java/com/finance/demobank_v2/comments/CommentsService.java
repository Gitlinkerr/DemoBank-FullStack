package com.finance.demobank_v2.comments;

import com.finance.demobank_v2.bankingcore.Account;
import com.finance.demobank_v2.bankingcore.AccountRepository;
import com.finance.demobank_v2.exceptions.NotFoundException;
import com.finance.demobank_v2.user.User;
import com.finance.demobank_v2.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentsService {
    private final CommentRepository commentRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    List<String> getCommentsByAccountId(Long accountId, Principal principal) {
        User currentUser = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NotFoundException("Logged-in user not found"));
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account with id " + accountId + " is not found"));
        User userForGivenAccountId = account.getUser();
        Collection<? extends GrantedAuthority> authorities = currentUser.getAuthorities();
        if(!currentUser.getId().equals(userForGivenAccountId.getId())
                && authorities.stream().noneMatch(a -> a.getAuthority().equals("ADMIN"))) {
            throw new AccessDeniedException("You don't have permission to access this resource.");
        }
        return commentRepository.findAllByAccount(account)
                .stream()
                .map(comment -> comment.getMessage())
                .collect(Collectors.toList());
    }
    public void writeComment(Long accountId, String message, Principal principal) {
        User currentUser = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NotFoundException("Logged-in user not found"));

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account with id " + accountId + " is not found"));
        User userForGivenAccountId = account.getUser();

        Collection<? extends GrantedAuthority> authorities = currentUser.getAuthorities();
        if(!currentUser.getId().equals(userForGivenAccountId.getId())
                && authorities.stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new AccessDeniedException("You don't have permission to access this resource.");
        }
        Comment newComment = new Comment();
        newComment.setAccount(account);
        newComment.setMessage(message);
        commentRepository.save(newComment);
    }
}
