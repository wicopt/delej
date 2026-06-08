package com.mariia.user_service.application.services;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mariia.user_service.infrastructure.entity.UserEntity;
import com.mariia.user_service.infrastructure.repositories.UserRepository;
import com.mariia.user_service.presentation.dto.UserResponse;
import com.mariia.user_service.presentation.exceptions.NotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse getUserById(UUID userId) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        return UserResponse.fromEntity(userEntity);
    }

    public List<UserResponse> searchByUsername(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username)
                .stream()
                .map(UserResponse::fromEntity)
                .toList();
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(UserResponse::fromEntity).toList();
    }

    public UserResponse patchUser(UUID userId, Map<String, Object> updates) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Применяем только те поля, которые пришли
        updates.forEach((key, value) -> {
            switch (key) {
                case "username" -> user.setUsername((String) value);
                case "email" -> user.setEmail((String) value);
                case "name" -> user.setName((String) value);
            }
        });

        return UserResponse.fromEntity(userRepository.save(user));
    }

    public List<UserResponse> getUsersByIds(List<UUID> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            return List.of();
        }

        List<UserEntity> users = userRepository.findAllById(userIds);

        return users.stream()
                .map(UserResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
