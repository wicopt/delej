package com.mariia.user_service.presentation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mariia.user_service.application.services.UserService;
import com.mariia.user_service.presentation.dto.UserResponse;
import com.mariia.user_service.utils.SecurityUtils;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;



    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        UUID userId = SecurityUtils.getCurrentUserId();

        UserResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable UUID id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> searchByUsername(@RequestParam String username) {
        return ResponseEntity.ok(userService.searchByUsername(username));
    }

    @PatchMapping("/")
    public ResponseEntity<UserResponse> patchUser(
            @RequestBody Map<String, Object> updates) {
        UUID userId = SecurityUtils.getCurrentUserId();
        UserResponse user = userService.patchUser(userId, updates);
        return ResponseEntity.ok(user);
    }

      @PostMapping("/batch")
    public ResponseEntity<List<UserResponse>> getUsersBatch(@RequestBody List<UUID> userIds) {
        List<UserResponse> users = userService.getUsersByIds(userIds);
        return ResponseEntity.ok(users);
    }

}
