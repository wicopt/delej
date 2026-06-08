package com.mariia.user_service.infrastructure.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mariia.user_service.domain.enums.FriendshipStatus;
import com.mariia.user_service.infrastructure.entity.FriendshipEntity;
import com.mariia.user_service.infrastructure.entity.FriendshipId;

public interface FriendshipRepository extends JpaRepository<FriendshipEntity, FriendshipId> {

    Optional<FriendshipEntity> findByIdUserId1AndIdUserId2(UUID userId1, UUID userId2);

    // все дружбы пользователя
    @Query("SELECT f FROM FriendshipEntity f WHERE f.id.userId1 = :id OR f.id.userId2 = :id")
    List<FriendshipEntity> findAllByUserId(@Param("id") UUID userId);

    List<FriendshipEntity> findByInitiatorIdAndStatus(UUID initiatorId, FriendshipStatus status);

    @Query("""
                SELECT f FROM FriendshipEntity f
                WHERE (f.id.userId1 = :userId OR f.id.userId2 = :userId)
                  AND f.initiatorId <> :userId
                  AND f.status = :status
            """)
    List<FriendshipEntity> findIncomingRequests(@Param("userId") UUID userId,
            @Param("status") FriendshipStatus status);

    @Query("""
                SELECT f FROM FriendshipEntity f
                WHERE (f.id.userId1 = :userId OR f.id.userId2 = :userId)
                AND f.status = :status
            """)
    List<FriendshipEntity> findAllByUserAndStatus(
            @Param("userId") UUID userId,
            @Param("status") FriendshipStatus status);
}