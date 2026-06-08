package mariia.ushakova.event_service.domain.model;

import java.util.UUID;

public interface BalanceRow {
    UUID getUserId();
    double getBalance();
}