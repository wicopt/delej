package com.mariia.user_service.infrastructure.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "app_user") 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", columnDefinition = "UUID")
    private UUID userId;  
    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String username;
    
    @Column(name = "name", length = 255, nullable = false)
    private String name;
    
    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;
    
    @Column(name = "password_hash", length = 255, nullable = false)
    private String passwordHash;
}