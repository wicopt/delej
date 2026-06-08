package mariia.ushakova.event_service.presentation.controllers;

import java.util.List;
import java.util.UUID;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import mariia.ushakova.event_service.application.services.ExpenseParticipantService;
import mariia.ushakova.event_service.presentation.dto.request.ExpenseParticipantCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.ExpenseParticipantResponse;

@RestController
@RequestMapping("/expense-participants")
@RequiredArgsConstructor
public class ExpenseParticipantController {

    private final ExpenseParticipantService participantService;

    @PostMapping
    public ResponseEntity<ExpenseParticipantResponse> addParticipant(
            @Valid @RequestBody ExpenseParticipantCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(participantService.addParticipantToExpense(request));
    }

    @GetMapping("/expense/{expenseId}")
    public ResponseEntity<List<ExpenseParticipantResponse>> getExpenseParticipants(
            @PathVariable UUID expenseId) {
        return ResponseEntity.ok(participantService.getParticipantsByExpense(expenseId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpenseParticipantResponse>> getUserExpenses(
            @PathVariable UUID userId) {
        return ResponseEntity.ok(participantService.getExpensesByUser(userId));
    }

    @DeleteMapping("/expense/{expenseId}/user/{userId}")
    public ResponseEntity<Void> removeParticipant(
            @PathVariable UUID expenseId,
            @PathVariable UUID userId) {
        participantService.removeParticipantFromExpense(expenseId, userId);
        return ResponseEntity.noContent().build();
    }
}