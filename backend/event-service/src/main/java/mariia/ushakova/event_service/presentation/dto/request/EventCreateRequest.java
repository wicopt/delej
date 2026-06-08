package mariia.ushakova.event_service.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EventCreateRequest {
    @NotBlank(message = "Event name is required")
    private String eventName;
    @NotBlank(message = "Icon id is required")
    private String iconId;
    
}
