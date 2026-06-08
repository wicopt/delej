package mariia.ushakova.event_service.application.services;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mariia.ushakova.event_service.application.mappers.ExpenseParticipantMapper;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseParticipantEntity;
import mariia.ushakova.event_service.infrastructure.repository.ExpenseParticipantRepository;
import mariia.ushakova.event_service.presentation.dto.request.ExpenseParticipantCreateRequest;
import mariia.ushakova.event_service.presentation.dto.responce.ExpenseParticipantResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExpenseParticipantService {

    private final ExpenseParticipantRepository participantRepository;
    private final ExpenseParticipantMapper participantMapper;

    public ExpenseParticipantResponse addParticipantToExpense(ExpenseParticipantCreateRequest request) {
        log.info("Adding user {} to expense {}", request.getUserId(), request.getExpenseId());
        
        // Проверяем, не существует ли уже такая связь
        if (participantRepository.existsByIdExpenseIdAndIdUserId(request.getExpenseId(), request.getUserId())) {
            log.warn("Participant already exists: expenseId={}, userId={}", request.getExpenseId(), request.getUserId());
            throw new RuntimeException("Participant already added to this expense");
        }
        
        ExpenseParticipantEntity entity = participantMapper.toEntity(request);
        ExpenseParticipantEntity saved = participantRepository.save(entity);
        
        log.info("Participant added successfully");
        return participantMapper.toResponse(saved);
    }

    public List<ExpenseParticipantResponse> getParticipantsByExpense(UUID expenseId) {
        log.info("Fetching participants for expense: {}", expenseId);
        
        return participantRepository.findByIdExpenseId(expenseId)
                .stream()
                .map(participantMapper::toResponse)
                .toList();
    }

    public List<ExpenseParticipantResponse> getExpensesByUser(UUID userId) {
        log.info("Fetching expenses for user: {}", userId);
        
        return participantRepository.findByIdUserId(userId)
                .stream()
                .map(participantMapper::toResponse)
                .toList();
    }

    public void removeParticipantFromExpense(UUID expenseId, UUID userId) {
        log.info("Removing user {} from expense {}", userId, expenseId);
        
        if (!participantRepository.existsByIdExpenseIdAndIdUserId(expenseId, userId)) {
            log.warn("Participant not found: expenseId={}, userId={}", expenseId, userId);
            throw new RuntimeException("Participant not found");
        }
        
        participantRepository.deleteByIdExpenseIdAndIdUserId(expenseId, userId);
        log.info("Participant removed successfully");
    }
    
    public void removeAllParticipantsFromExpense(UUID expenseId) {
        log.info("Removing all participants from expense: {}", expenseId);
        participantRepository.deleteAllByExpenseId(expenseId);
        log.info("All participants removed successfully");
    }
}