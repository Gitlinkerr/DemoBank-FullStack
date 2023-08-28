package com.finance.demobank_v2.user;

import com.finance.demobank_v2.dto.request.EditUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@RestController public class UserController {
    private final UserService userService;

    @PutMapping("/editUser/{id}")
    public ResponseEntity<Void> editUser(@PathVariable Long id, @RequestBody EditUserRequest editUserDTO, Principal principal) {
        userService.editUser(id, editUserDTO, principal);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, Principal principal) {
        boolean deleted = userService.handleUserDeletion(id, principal);

        if(deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
