package com.finance.demobank_v2.user;

import com.finance.demobank_v2.dto.request.EditUserRequest;
import com.finance.demobank_v2.exceptions.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public void editUser(Long id, EditUserRequest editUserDTO, Principal principal) {
        Optional<User> loggedInUser = userRepository.findByEmail(principal.getName());
        if (loggedInUser.isEmpty() || !loggedInUser.get().getId().equals(id)) {
            throw new AccessDeniedException("You are not authorized to edit this user");
        }
        User user = loggedInUser.get();
        user.setFirstname(editUserDTO.getNewFirstname());
        user.setLastname(editUserDTO.getNewLastName());
        user.setPassword(editUserDTO.getNewPassword());
        userRepository.save(user);
    }

    public boolean handleUserDeletion(Long id, Principal principal) {
        User currentUser = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NotFoundException("Error: Current User is not found."));
        // Check if the logged-in user is trying to delete their own account or if they are an admin
        if(currentUser.getId().equals(id) || currentUser.getRole() == Role.ADMIN) {
            markUserAsDeleted(id);
            return true;
        }
        return false;
    }

    private void markUserAsDeleted(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Error: User is not found."));
        user.setDeleted(true);
        userRepository.save(user);
    }

}
