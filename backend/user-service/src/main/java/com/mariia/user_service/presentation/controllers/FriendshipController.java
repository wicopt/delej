package com.mariia.user_service.presentation.controllers;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mariia.user_service.application.services.FriendshipService;
import com.mariia.user_service.presentation.dto.FriendshipResponse;
import com.mariia.user_service.utils.SecurityUtils;

@RestController
@RequestMapping("/friends")
public class FriendshipController {
    @Autowired
    private FriendshipService friendshipService;

    @GetMapping("/all")
    public ResponseEntity<FriendshipResponse[]> requestsIncoming() {
        UUID curUser = SecurityUtils.getCurrentUserId();
        System.out.println("CUR USER: " + curUser);
        FriendshipResponse[] friendship = friendshipService.getFriends(curUser);
        return ResponseEntity.ok(friendship);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteFriend(@PathVariable UUID userId) {
        UUID curUser = SecurityUtils.getCurrentUserId();

        friendshipService.deleteFriendship(curUser, userId);

        return ResponseEntity.ok(Map.of("message", "Friendship removed successfully"));
    }
}
