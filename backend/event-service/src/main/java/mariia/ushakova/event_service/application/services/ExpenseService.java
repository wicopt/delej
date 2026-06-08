package mariia.ushakova.event_service.application.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mariia.ushakova.event_service.application.mappers.ExpenseMapper;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseEntity;
import mariia.ushakova.event_service.infrastructure.repository.ExpenseRepository;
import mariia.ushakova.event_service.presentation.dto.request.ExpenseCreateRequest;
import mariia.ushakova.event_service.presentation.dto.request.ExpenseParticipantCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.ExpenseResponse;

@RequiredArgsConstructor
@Service
@Slf4j
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final ExpenseParticipantService participantService;

    public ExpenseResponse createExpense(ExpenseCreateRequest request) {
        log.info("Creating expense: {}", request.getName());

        ExpenseEntity expense = ExpenseEntity.builder()
                .eventId(request.getEventId())
                .name(request.getName())
                .payerId(request.getPayerId())
                .dateOfPayment(request.getDateOfPayment() != null ? request.getDateOfPayment() : LocalDate.now())
                .totalCost(request.getTotalCost())
                .currency(request.getCurrency())
                .category(request.getCategory() != null ? request.getCategory() : "other")
                .splitType(request.getSplitType() != null ? request.getSplitType() : "equal")
                .isActive(true)
                .build();

        ExpenseEntity saved = expenseRepository.save(expense);

        ExpenseParticipantCreateRequest participantRequest = ExpenseParticipantCreateRequest.builder()
                .expenseId(saved.getExpenseId())
                .userId(saved.getPayerId())
                .build();

        try {
            participantService.addParticipantToExpense(participantRequest);
            log.info("Payer {} automatically added as participant", saved.getPayerId());
        } catch (Exception e) {
            log.warn("Payer was already a participant or error: {}", e.getMessage());
        }

        log.info("Expense ID: {}", saved.getExpenseId());
        return expenseMapper.toResponse(saved);
    }

    public List<ExpenseResponse> getEventExpenses(UUID eventId) {
        return expenseRepository.findByEventIdAndIsActive(eventId, true)
                .stream()
                .map(expenseMapper::toResponse)
                .toList();
    }

    public void deleteExpense(UUID expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    public List<ExpenseResponse> getUserExpenses(UUID userId) {
        return expenseRepository.findByPayerId(userId)
                .stream()
                .map(expenseMapper::toResponse)
                .toList();
    }
}