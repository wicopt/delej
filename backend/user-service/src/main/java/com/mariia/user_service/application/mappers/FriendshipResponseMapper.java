package com.mariia.user_service.application.mappers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mariia.user_service.domain.model.Friendship;
import com.mariia.user_service.infrastructure.entity.UserEntity;
import com.mariia.user_service.infrastructure.repositories.UserRepository;
import com.mariia.user_service.presentation.dto.FriendshipResponse;
import com.mariia.user_service.presentation.exceptions.ApiRequestException;

@Component
public class FriendshipResponseMapper {

        @Autowired
        private UserRepository userRepository;

        public FriendshipResponse mapResponse(Friendship friendship, UUID currentUserId) {
                var user1 = friendship.getUserId1();
                var user2 = friendship.getUserId2();

                var otherUserId = user1.equals(currentUserId) ? user2 : user1;
                 
                UserEntity otherUser = userRepository.findById(otherUserId)
                .orElseThrow(() -> new ApiRequestException("User not found"));


                return new FriendshipResponse(
                                otherUser.getUserId(),
                                otherUser.getUsername(),
                                otherUser.getName(),
                                otherUser.getEmail(),
                                friendship.getStatus());
        }

}
