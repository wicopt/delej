package com.mariia.user_service.presentation.dto;

import java.util.UUID;

import com.mariia.user_service.domain.enums.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FriendshipResponse {
    private UUID userId;
    private String username;
    private String name;
    private String email;
    private FriendshipStatus status;

}
