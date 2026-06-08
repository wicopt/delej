package mariia.ushakova.event_service.domain.model;

import java.time.LocalDate;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    
    private UUID expenseId;
    private UUID eventId;
    private String name;
    private UUID payerId;
    private LocalDate dateOfPayment;
    private Long totalCost;
    private String currency;
    private Boolean isActive;
    private String category;
    private String splitType;
    
}