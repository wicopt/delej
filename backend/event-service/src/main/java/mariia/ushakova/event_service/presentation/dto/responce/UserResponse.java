package mariia.ushakova.event_service.presentation.dto.responce;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@Data
@AllArgsConstructor
public class UserResponse {
    private UUID userId;
    private String username;
    private String name;
    private String email;

}