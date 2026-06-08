package mariia.ushakova.event_service.infrastructure.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_event")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantEntity {
    
    @EmbeddedId
    private ParticipantId id;

    
}

