package mariia.ushakova.event_service.presentation.dto.responce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseParticipantResponse {
    private UUID expenseId;
    private UserResponse user; 
}