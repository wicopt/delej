package mariia.ushakova.event_service.application.mappers;

import java.util.List;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import mariia.ushakova.event_service.infrastructure.client.UserServiceClient;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseEntity;
import mariia.ushakova.event_service.presentation.dto.responce.ExpenseResponse;
import mariia.ushakova.event_service.presentation.dto.responce.UserResponse;

@Component
@RequiredArgsConstructor  
public class ExpenseMapper {
    
    private final UserServiceClient userServiceClient;  

    public ExpenseResponse toResponse(ExpenseEntity entity) {
        UserResponse payer = userServiceClient.getUsersByIds(List.of(entity.getPayerId()))
                .stream()
                .findFirst()
                .orElse(null);
        
        return ExpenseResponse.builder()
                .expenseId(entity.getExpenseId())
                .eventId(entity.getEventId())
                .name(entity.getName())
                .payer(payer)
                .dateOfPayment(entity.getDateOfPayment())
                .totalCost(entity.getTotalCost())
                .currency(entity.getCurrency())
                .category(entity.getCategory())
                .splitType(entity.getSplitType())
                .build();
    }
}