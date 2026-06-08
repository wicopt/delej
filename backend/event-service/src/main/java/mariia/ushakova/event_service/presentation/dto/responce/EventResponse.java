package mariia.ushakova.event_service.presentation.dto.responce;

import lombok.Builder;
import lombok.Value;
import java.time.LocalDateTime;
import java.util.UUID;

@Value
@Builder
public class EventResponse {
    UUID eventId;
    String eventName;
    UUID creatorId;
    String iconId;
    boolean isFinished;
    LocalDateTime createdAt;
}