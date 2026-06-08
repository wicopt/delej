package mariia.ushakova.event_service.application.mappers;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import mariia.ushakova.event_service.infrastructure.client.UserServiceClient;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseParticipantEntity;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseParticipantId;
import mariia.ushakova.event_service.presentation.dto.request.ExpenseParticipantCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.ExpenseParticipantResponse;
import mariia.ushakova.event_service.presentation.dto.responce.UserResponse;

@Component
@RequiredArgsConstructor
public class ExpenseParticipantMapper {

    private final UserServiceClient userServiceClient;

    public ExpenseParticipantResponse toResponse(ExpenseParticipantEntity entity) {
        if (entity == null) {
            return null;
        }

        // Получаем данные пользователя по userId из составного ключа
        UserResponse user = userServiceClient.getUsersByIds(List.of(entity.getId().getUserId()))
                .stream()
                .findFirst()
                .orElse(null);

        return ExpenseParticipantResponse.builder()
                .expenseId(entity.getId().getExpenseId())
                .user(user)
                .build();
    }

     public ExpenseParticipantEntity toEntity(ExpenseParticipantCreateRequest request) {

        ExpenseParticipantId id = new ExpenseParticipantId(request.getExpenseId(), request.getUserId());

        return ExpenseParticipantEntity.builder()
                .id(id)
                .build();
    }

 
}