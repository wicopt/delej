package mariia.ushakova.event_service.presentation.dto.responce;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class BalanceResponse {
    UserResponse creditor;
    UserResponse borrower;
    double amount;
    String currensy;
}
