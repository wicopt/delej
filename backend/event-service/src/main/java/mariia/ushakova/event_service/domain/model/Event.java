package mariia.ushakova.event_service.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Event {
    UUID eventId;
    String eventName;
    UUID creatorId;
    String iconId;
    boolean isFinished;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}