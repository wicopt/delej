package mariia.ushakova.event_service.presentation.dto.request;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseCreateRequest {

    @NotNull(message = "Event id is required")
    private UUID eventId;

    @NotBlank(message = "Expense name is required")
    private String name;

    @NotNull(message = "Total cost is required")
    private Long totalCost;

    @NotBlank(message = "Currency is required")
    private String currency;

    @NotNull(message = "Payer id is required")
    private UUID payerId;

    private LocalDate dateOfPayment;

    private String category = "other";

    private String splitType = "equal";
}