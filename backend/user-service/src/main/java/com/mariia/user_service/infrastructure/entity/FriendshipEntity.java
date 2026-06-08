package com.mariia.user_service.infrastructure.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

import com.mariia.user_service.domain.enums.FriendshipStatus;

@Entity
@Table(name = "friendships")
@Data
@NoArgsConstructor
public class FriendshipEntity {

    public FriendshipEntity(FriendshipId id, UUID initiatorId, FriendshipStatus status, Instant createdAt) {
        this.id = id;
        this.initiatorId = initiatorId;
        this.status = status;
        this.createdAt = createdAt;
    }

    @EmbeddedId
    private FriendshipId id; // составной PK

    @Column(name = "initiator_id", nullable = false)
    private UUID initiatorId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FriendshipStatus status;

    @Column(name = "created_at")
    private Instant createdAt;
}

