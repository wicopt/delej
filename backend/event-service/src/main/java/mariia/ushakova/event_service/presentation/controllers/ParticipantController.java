package mariia.ushakova.event_service.presentation.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import mariia.ushakova.event_service.presentation.dto.request.ParticipantCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.ParticipantResponce;
import mariia.ushakova.event_service.presentation.dto.responce.UserResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ParticipantResponce createParticipant(@Valid @RequestBody ParticipantCreateRequest request) {
        log.info("POST /participants - Creating participant: {}", request);
        ParticipantResponce response = eventService.createParticipant(request);
        log.info("POST /participants - Participant created successfully: {}", response);
        return response;
    }

    @DeleteMapping("/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteParticipant(@PathVariable UUID eventId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        eventService.deleteParticipant(eventId, currentUserId);
    }

    @GetMapping("/{eventId}")
    public List<UserResponse> getParticipants(@PathVariable UUID eventId) {

        return eventService.getEventParticipants(eventId);
    }

}
