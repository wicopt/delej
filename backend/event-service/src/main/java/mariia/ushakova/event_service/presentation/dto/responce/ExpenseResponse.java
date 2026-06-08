package mariia.ushakova.event_service.presentation.dto.responce;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ExpenseResponse {
    UUID expenseId;
    UUID eventId;
    String name;
    UserResponse payer;
    LocalDate dateOfPayment;
    Long totalCost;
    String currency;
    String category;
    String splitType;
}