package com.mariia.user_service.presentation.controllers;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mariia.user_service.application.services.FriendshipService;
import com.mariia.user_service.presentation.dto.FriendshipResponse;
import com.mariia.user_service.utils.SecurityUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/friend-requests")
public class FriendsipRequestsController {
    @Autowired
    private FriendshipService friendshipService;

    @PostMapping("/")
    public ResponseEntity<FriendshipResponse> sendFriendRequest(@RequestBody Map<String, Object> body) {
        Object toUserIdObj = body.get("toUserId");
        if (toUserIdObj == null) {
            throw new RuntimeException("toUserId is required");
        }

        UUID toUserId;
        if (toUserIdObj instanceof String) {
            toUserId = UUID.fromString((String) toUserIdObj);
        } else if (toUserIdObj instanceof UUID) {
            toUserId = (UUID) toUserIdObj;
        } else {
            throw new RuntimeException("Invalid toUserId format");
        }
        UUID curUser = SecurityUtils.getCurrentUserId();

        System.out.println("CUR USER: " + curUser);
        System.out.println("TO USER: " + toUserId);
        FriendshipResponse friendship = friendshipService.sendFriendRequest(curUser, toUserId);
        return ResponseEntity.ok(friendship);
    }

    @PatchMapping("/{toUserId}")
    public ResponseEntity<FriendshipResponse> acceptFriendRequest(@PathVariable  UUID toUserId) {
        UUID curUser = SecurityUtils.getCurrentUserId();

        FriendshipResponse friendship = friendshipService.acceptFriendRequest(curUser, toUserId);
        return ResponseEntity.ok(friendship);
    }

    @GetMapping("/incoming")
    public ResponseEntity<FriendshipResponse[]> requestsIncoming() {
        UUID curUser = SecurityUtils.getCurrentUserId();
        System.out.println("CUR USER: " + curUser);
        FriendshipResponse[] friendship = friendshipService.requestsIncoming(curUser);
        return ResponseEntity.ok(friendship);
    }
    
    @GetMapping("/outgoing")
    public ResponseEntity<FriendshipResponse[]> requestsOutgoing() {
        UUID curUser = SecurityUtils.getCurrentUserId();
        System.out.println("CUR USER: " + curUser);
        FriendshipResponse[] friendship = friendshipService.requestsOutgoing(curUser);
        return ResponseEntity.ok(friendship);
    }    

}
