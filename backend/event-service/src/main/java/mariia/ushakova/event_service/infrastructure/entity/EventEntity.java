package mariia.ushakova.event_service.infrastructure.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "event")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "event_id")
    private UUID eventId;
    
    @Column(name = "event_name", nullable = false)
    private String eventName;
    
    @Column(name = "creator_id", nullable = false)
    private UUID creatorId;
    
    @Column(name = "is_finished")
    @Builder.Default
    private boolean isFinished = false;

    @Column(name = "icon_id", nullable = false)
    @Builder.Default
    private String iconId = "0";
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}