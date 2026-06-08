package mariia.ushakova.event_service.presentation.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mariia.ushakova.event_service.application.services.EventService;
import mariia.ushakova.event_service.infrastructure.security.SecurityUtils;
import mariia.ushakova.event_service.presentation.dto.request.EventCreateRequest;
import mariia.ushakova.event_service.presentation.dto.request.EventPatchRequest;
import mariia.ushakova.event_service.presentation.dto.responce.EventResponse;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponse createEvent(@Valid @RequestBody EventCreateRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();

        return eventService.createEvent(request, currentUserId);
    }

    @DeleteMapping("/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable UUID eventId) {
        eventService.deleteEvent(eventId);
    }

    @PatchMapping("/{eventId}")
    public EventResponse patchEvent(
            @PathVariable UUID eventId,
            @Valid @RequestBody EventPatchRequest request) {
        return eventService.patchEvent(eventId, request);
    }

    @GetMapping
    public List<EventResponse> getMyEvents() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return eventService.getUserEvents(currentUserId);
    }

    @GetMapping("/{eventId}")
    public EventResponse getEvent(@PathVariable UUID eventId) {
        return eventService.getEvent(eventId);
    }
}