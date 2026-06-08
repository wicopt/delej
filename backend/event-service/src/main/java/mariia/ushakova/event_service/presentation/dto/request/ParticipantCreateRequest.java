package mariia.ushakova.event_service.presentation.dto.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParticipantCreateRequest {

    @NotNull(message = "Event Id is required")
    private UUID eventId;
    @NotNull(message = "User Id is required")
    private UUID userId;

}
