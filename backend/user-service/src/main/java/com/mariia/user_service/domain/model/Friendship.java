package com.mariia.user_service.domain.model;

import com.mariia.user_service.domain.enums.FriendshipStatus;
import com.mariia.user_service.infrastructure.entity.FriendshipEntity;
import com.mariia.user_service.infrastructure.entity.FriendshipId;
import com.mariia.user_service.utils.FriendshipIdUtils;

import java.time.Instant;
import java.util.UUID;

public class Friendship {

    private final UUID userId1;
    private final UUID userId2;
    private UUID initiatorId;
    private FriendshipStatus status;
    private Instant createdAt;

    public Friendship(UUID userId1, UUID userId2, UUID initiatorId, FriendshipStatus status, Instant createdAt) {
        UUID[] ordered = FriendshipIdUtils.orderedUuid(userId1, userId2);

        this.userId1 = ordered[0];
        this.userId2 = ordered[1];
        this.initiatorId = initiatorId;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static Friendship fromEntity(FriendshipEntity entity) {
        return new Friendship(entity.getId().getUserId1(),
                entity.getId().getUserId2(),
                entity.getInitiatorId(),
                entity.getStatus(),
                entity.getCreatedAt());
    }

    public FriendshipEntity toEntity() {
        FriendshipId id = new FriendshipId(this.userId1, this.userId2);
        return new FriendshipEntity(
                id,
                this.initiatorId,
                this.status,
                this.createdAt
        );
    }

    public void setStatus(FriendshipStatus status, UUID initiatorId) {
        switch (status) {
            case ACCEPTED:
                if (this.status == FriendshipStatus.PENDING && initiatorId != this.initiatorId) {
                    this.status = status;
                }
                break;

            case PENDING:
                if (this.status == FriendshipStatus.ACCEPTED) {
                    this.initiatorId = otherOne(initiatorId);
                }
                this.status = status;
                break;
            default:
                break;
        }
    }

    public UUID getUserId1() {
        return userId1;
    }

    public UUID getUserId2() {
        return userId2;
    }

    public UUID getInitiatorId() {
        return initiatorId;
    }

    public FriendshipStatus getStatus() {
        return status;
    }

    private UUID otherOne(UUID userId) {
        if (userId == userId1) {
            return userId2;
        }
        return userId1;

    }

}