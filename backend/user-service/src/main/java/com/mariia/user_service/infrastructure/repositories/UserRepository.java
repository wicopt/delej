package com.mariia.user_service.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mariia.user_service.infrastructure.entity.UserEntity;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity,UUID> {
    List<UserEntity> findByUsernameContainingIgnoreCase(String username);
}