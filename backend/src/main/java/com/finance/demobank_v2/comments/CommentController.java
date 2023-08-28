package com.finance.demobank_v2.comments;

import com.finance.demobank_v2.dto.request.CommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bankingcore/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentsService commentsService;

    @GetMapping("/getcomments/{accountId}")
    public ResponseEntity<List<String>> getCommentsByAccountId(@PathVariable("accountId") Long accountId, Principal principal) {
        return ResponseEntity.ok(commentsService.getCommentsByAccountId(accountId, principal));
    }

    @PostMapping("/writecomment/{accountId}")
    public ResponseEntity<Void> writeComment(@PathVariable("accountId") Long accountId, @RequestBody CommentRequest commentRequest, Principal principal) {
        commentsService.writeComment(accountId, commentRequest.getMessage(),principal);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Returns a 201 Created status
    }

}
