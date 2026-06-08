package mariia.ushakova.event_service.presentation.dto.responce;

import lombok.Builder;
import lombok.Value;
import java.util.UUID;

@Value
@Builder
public class ParticipantResponce {
    UUID eventId;
    String message = "User Added";
}