package mariia.ushakova.event_service.infrastructure.entity;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantId implements Serializable {
    
    @Column(name = "user_id")
    private UUID userId;
    
    @Column(name = "event_id")
    private UUID eventId;
}