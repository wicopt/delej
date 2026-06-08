package com.mariia.user_service.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

import com.mariia.user_service.infrastructure.entity.UserEntity;

@Data
@AllArgsConstructor
public class UserResponse {
    private UUID userId;
    private String username;
    private String name;
    private String email;

    public static UserResponse fromEntity(UserEntity user) {
    return new UserResponse(
        user.getUserId(),
        user.getUsername(),
        user.getName(),
        user.getEmail()
    );
}
}