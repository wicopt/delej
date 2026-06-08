package mariia.ushakova.event_service.application.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mariia.ushakova.event_service.application.mappers.EventMapper;
import mariia.ushakova.event_service.infrastructure.client.UserServiceClient;
import mariia.ushakova.event_service.infrastructure.entity.EventEntity;
import mariia.ushakova.event_service.infrastructure.entity.ParticipantEntity;
import mariia.ushakova.event_service.infrastructure.entity.ParticipantId;
import mariia.ushakova.event_service.infrastructure.repository.EventRepository;
import mariia.ushakova.event_service.infrastructure.repository.ParticipantRepository;
import mariia.ushakova.event_service.presentation.dto.request.EventCreateRequest;
import mariia.ushakova.event_service.presentation.dto.request.EventPatchRequest;
import mariia.ushakova.event_service.presentation.dto.request.ParticipantCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.EventResponse;
import mariia.ushakova.event_service.presentation.dto.responce.ParticipantResponce;
import mariia.ushakova.event_service.presentation.dto.responce.UserResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final ParticipantRepository participantRepository;
    private final EventMapper eventMapper;

    private final UserServiceClient userServiceClient;

    @Transactional
    public EventResponse createEvent(EventCreateRequest request, UUID creatorId) {
        log.info("Creating event: {}", request.getEventName());

        EventEntity entity = EventEntity.builder()
                .eventName(request.getEventName())
                .creatorId(creatorId)
                .iconId(request.getIconId())
                .isFinished(false)
                .createdAt(LocalDateTime.now())
                .build();
        EventEntity saved = eventRepository.save(entity);

        createParticipant(entity.getCreatorId(), entity.getEventId());
        return eventMapper.toResponse(eventMapper.toDomain(saved));
    }

    private void createParticipant(UUID userId, UUID eventId) {
        ParticipantId participantId = new ParticipantId(userId, eventId);
        ParticipantEntity participant = ParticipantEntity.builder()
                .id(participantId)
                .build();

        participantRepository.save(participant);
        log.info("User {} added to event {}", userId, eventId);
    }

    // public ParticipantResponce createParticipant(ParticipantCreateRequest
    // request) {
    // createParticipant(request.getUserId(), request.getEventId());
    // return ParticipantResponce.builder().eventId(request.getEventId()).build();
    // }
    public ParticipantResponce createParticipant(ParticipantCreateRequest request) {
        log.info("Creating participant: userId={}, eventId={}", request.getUserId(), request.getEventId());

        createParticipant(request.getUserId(), request.getEventId());

        log.info("Participant created successfully: userId={}, eventId={}", request.getUserId(), request.getEventId());
        return ParticipantResponce.builder().eventId(request.getEventId()).build();
    }

    public List<EventResponse> getUserEvents(UUID userId) {

        List<EventEntity> events = eventRepository.findEventsByUserId(userId);

        return events.stream()
                .map(eventMapper::toDomain)
                .map(eventMapper::toResponse)
                .collect(Collectors.toList());
    }

    public EventResponse getEvent(UUID eventId) {

        EventEntity eventEntity = eventRepository.findById(eventId)
                .orElseThrow(() -> {
                    log.error("Event not found with id: {}", eventId);
                    return new RuntimeException("Event not found with id: " + eventId);
                });

        return eventMapper.toResponse(eventMapper.toDomain(eventEntity));
    }

    public void deleteParticipant(UUID eventId, UUID userId) {
        if (!participantRepository.existsByUserIdAndEventId(userId, eventId)) {
            log.warn("User {} is not a participant of event {}", userId, eventId);
            throw new RuntimeException("User is not a participant of this event");
        }
        participantRepository.deleteParticipant(userId, eventId);

    }

    public List<UserResponse> getEventParticipants(UUID eventId) {
        log.info("Получение участников события: {}", eventId);

        // 1. Получаем ID участников из вашей БД
        List<UUID> userIds = participantRepository.findByEventId(eventId)
                .stream()
                .map(p -> p.getId().getUserId())
                .collect(Collectors.toList());

        if (userIds.isEmpty()) {
            log.info("У события {} нет участников", eventId);
            return List.of();
        }

        // 2. Запрашиваем данные пользователей из User Service
        return userServiceClient.getUsersByIds(userIds);
    }

    public void deleteEvent(UUID eventId) {
        eventRepository.deleteById(eventId);
    }

    @Transactional
    public EventResponse patchEvent(UUID eventId, EventPatchRequest request) {
        log.info("Patching event: {}", eventId);

        // 1. Находим событие
        EventEntity eventEntity = eventRepository.findById(eventId)
                .orElseThrow(() -> {
                    log.error("Event not found with id: {}", eventId);
                    return new RuntimeException("Event not found with id: " + eventId);
                });

        // 3. Частичное обновление (только non-null поля)
        if (request.getEventName() != null) {
            eventEntity.setEventName(request.getEventName());
        }

        if (request.getIsFinished() != null) {
            eventEntity.setFinished(request.getIsFinished());
        }

        if (request.getIconId() != null) {
            eventEntity.setIconId(request.getIconId());
        }
        // 4. Сохраняем (updatedAt обновится автоматически через @UpdateTimestamp)
        EventEntity updated = eventRepository.save(eventEntity);
        log.info("Event {} patched successfully", eventId);

        return eventMapper.toResponse(eventMapper.toDomain(updated));
    }
}