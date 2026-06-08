package com.mariia.user_service.infrastructure.entity;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class FriendshipId implements Serializable {
    @Column(name = "user_id_1")
    private UUID userId1;

    @Column(name = "user_id_2")
    private UUID userId2;

    public UUID getUserId1() {
        return userId1;
    }

    public UUID getUserId2() {
        return userId2;
    }

    public FriendshipId(UUID[] ordered) {
        this.userId1 = ordered[0];
        this.userId2 = ordered[1];
    }
    public FriendshipId(UUID id1, UUID id2) {
        this.userId1 = id1;
        this.userId2 = id2;
    }
}