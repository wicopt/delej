package mariia.ushakova.event_service.infrastructure.entity;

import java.io.Serializable;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseParticipantId implements Serializable {
    
    @Column(name = "expense_id")
    private UUID expenseId;
    
    @Column(name = "user_id")
    private UUID userId;
}