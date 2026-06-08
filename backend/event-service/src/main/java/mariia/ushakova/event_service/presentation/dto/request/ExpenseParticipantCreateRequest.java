package mariia.ushakova.event_service.presentation.dto.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor  
@AllArgsConstructor 
public class ExpenseParticipantCreateRequest {

    @NotNull(message = "Expense Id is required")
    private UUID expenseId;
    @NotNull(message = "User Id is required")
    private UUID userId;

}
