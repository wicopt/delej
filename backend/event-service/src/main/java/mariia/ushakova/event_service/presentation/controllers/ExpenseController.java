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
import mariia.ushakova.event_service.application.services.ExpenseService;
import mariia.ushakova.event_service.presentation.dto.request.ExpenseCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.ExpenseResponse;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseResponse createEvent(@Valid @RequestBody ExpenseCreateRequest request) {        
        return expenseService.createExpense(request);
    }

    
    @GetMapping("/{eventId}")
    public List<ExpenseResponse> getEventExpenses(@PathVariable UUID eventId) {
        return expenseService.getEventExpenses(eventId);
    }
    @DeleteMapping("/{expenseId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteParticipant(@PathVariable UUID expenseId) {
        expenseService.deleteExpense(expenseId);
    }
}