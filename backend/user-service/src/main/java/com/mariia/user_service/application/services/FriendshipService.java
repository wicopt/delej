package com.mariia.user_service.application.services;

import java.time.Instant;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mariia.user_service.application.mappers.FriendshipResponseMapper;
import com.mariia.user_service.domain.enums.FriendshipStatus;
import com.mariia.user_service.domain.model.Friendship;
import com.mariia.user_service.infrastructure.entity.FriendshipEntity;
import com.mariia.user_service.infrastructure.entity.FriendshipId;
import com.mariia.user_service.infrastructure.repositories.FriendshipRepository;
import com.mariia.user_service.presentation.dto.FriendshipResponse;
import com.mariia.user_service.presentation.exceptions.ApiRequestException;
import com.mariia.user_service.presentation.exceptions.NotFoundException;
import com.mariia.user_service.utils.FriendshipIdUtils;

@Service
public class FriendshipService {
    @Autowired
    private FriendshipRepository fRepository;

    @Autowired
    private FriendshipResponseMapper responseMapper;

    private static final Logger logger = LoggerFactory.getLogger(FriendshipService.class);

    public FriendshipResponse sendFriendRequest(UUID fromUserId, UUID toUserId) {
        logger.info("Attempting to send friend request from user: {} to user: {}", fromUserId, toUserId);

        // Нельзя отправить заявку самому себе
        if (fromUserId.equals(toUserId)) {
            logger.warn("User {} attempted to send friend request to themselves", fromUserId);
            throw new ApiRequestException("Cannot send friend request to yourself");
        }

        // Проверяем, существует ли уже дружба
        UUID[] ordered = FriendshipIdUtils.orderedUuid(fromUserId, toUserId);
        FriendshipId id = new FriendshipId(ordered);

        if (fRepository.existsById(id)) {
            logger.warn("Friendship already exists between users: {} and {}", fromUserId, toUserId);
            throw new ApiRequestException("Friendship already exists");
        }

        // Создаем новую дружбу со статусом PENDING
        Friendship friendship = new Friendship(
                fromUserId,
                toUserId,
                fromUserId, // инициатор - кто отправил
                FriendshipStatus.PENDING,
                Instant.now());

        // Конвертируем и сохраняем
        FriendshipEntity entity = friendship.toEntity();
        FriendshipEntity saved = fRepository.save(entity);

        logger.info("Successfully created pending friend request from user: {} to user: {} with id: {}",
                fromUserId, toUserId, saved.getId());

        // Возвращаем ответ
        Friendship savedFriendship = Friendship.fromEntity(saved);
        FriendshipResponse response = responseMapper.mapResponse(savedFriendship, fromUserId);

        logger.debug("Friend request response mapped: {}", response);

        return response;
    }

    public FriendshipResponse acceptFriendRequest(
            UUID currentUser,
            UUID otherUser) {
        UUID[] ordered = FriendshipIdUtils.orderedUuid(currentUser, otherUser);
        FriendshipId id = new FriendshipId(ordered);

        FriendshipEntity entity = fRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Friendship not found"));

        Friendship friendship = Friendship.fromEntity(entity);

        // 💡 вся бизнес-логика уже у тебя внутри домена
        friendship.setStatus(FriendshipStatus.ACCEPTED, currentUser);

        FriendshipEntity saved = fRepository.save(friendship.toEntity());

        return responseMapper.mapResponse(Friendship.fromEntity(saved), currentUser);
    }

    public FriendshipResponse[] requestsOutgoing(UUID curUser) {
        return fRepository.findByInitiatorIdAndStatus(curUser, FriendshipStatus.PENDING).stream()
                .map(Friendship::fromEntity)
                .map(f -> responseMapper.mapResponse(f, curUser))
                .toArray(FriendshipResponse[]::new);

    }

    public FriendshipResponse[] requestsIncoming(UUID curUser) {
        return fRepository.findIncomingRequests(curUser, FriendshipStatus.PENDING).stream()
                .map(Friendship::fromEntity)
                .map(f -> responseMapper.mapResponse(f, curUser))
                .toArray(FriendshipResponse[]::new);
    }

    public FriendshipResponse[] getFriends(UUID curUser) {
        return fRepository.findAllByUserAndStatus(curUser, FriendshipStatus.ACCEPTED).stream()
                .map(Friendship::fromEntity)
                .map(f -> responseMapper.mapResponse(f, curUser))
                .toArray(FriendshipResponse[]::new);

    }

    public FriendshipResponse getFriendship(UUID userId1, UUID userId2, UUID currUuid) {
        UUID[] ordered = FriendshipIdUtils.orderedUuid(userId1, userId2);
        FriendshipId id = new FriendshipId(ordered);
        FriendshipEntity friendshipEntity = fRepository.findById(id)
                .orElseThrow(() -> new ApiRequestException("Friendship not found"));
        ;
        Friendship friendship = Friendship.fromEntity(friendshipEntity);
        FriendshipResponse f = responseMapper.mapResponse(friendship, currUuid);
        return f;
    }

    public void deleteFriendship(UUID currentUserId, UUID otherUserId) {
        UUID[] ordered = FriendshipIdUtils.orderedUuid(currentUserId, otherUserId);
        FriendshipId id = new FriendshipId(ordered);

        FriendshipEntity entity = fRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Friendship not found"));

        fRepository.delete(entity);
    }

}
