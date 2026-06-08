package mariia.ushakova.event_service.application.mappers;

import mariia.ushakova.event_service.domain.model.Event;
import mariia.ushakova.event_service.infrastructure.entity.EventEntity;
import mariia.ushakova.event_service.presentation.dto.request.EventCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.EventResponse;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class EventMapper {
    
    public Event toDomain(EventCreateRequest request, UUID creatorUuid) {
        return Event.builder()
            .eventName(request.getEventName())
            .creatorId(creatorUuid)
            .iconId(request.getIconId())  // Добавлено поле iconId
            .isFinished(false)
            .createdAt(LocalDateTime.now())
            .build();
    }
    
    public Event toDomain(EventEntity entity) {
        return Event.builder()
            .eventId(entity.getEventId())
            .eventName(entity.getEventName())
            .creatorId(entity.getCreatorId())
            .iconId(entity.getIconId())  // Добавлено поле iconId
            .isFinished(entity.isFinished())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
    
    public EventEntity toEntity(Event event) {
        return EventEntity.builder()
            .eventId(event.getEventId())
            .eventName(event.getEventName())
            .creatorId(event.getCreatorId())
            .iconId(event.getIconId())  // Добавлено поле iconId
            .isFinished(event.isFinished())
            .createdAt(event.getCreatedAt())
            .updatedAt(event.getUpdatedAt())
            .build();
    }
    
    public EventResponse toResponse(Event event) {
        return EventResponse.builder()
            .eventId(event.getEventId())
            .eventName(event.getEventName())
            .creatorId(event.getCreatorId())
            .iconId(event.getIconId())  // Добавлено поле iconId
            .isFinished(event.isFinished())
            .createdAt(event.getCreatedAt())
            .build();
    }
}