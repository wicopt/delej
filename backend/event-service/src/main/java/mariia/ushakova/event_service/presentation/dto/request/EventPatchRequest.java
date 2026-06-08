package mariia.ushakova.event_service.presentation.dto.request;

import lombok.Data;

@Data
public class EventPatchRequest {
    private String eventName;
    private Boolean isFinished;
    private String iconId;
}