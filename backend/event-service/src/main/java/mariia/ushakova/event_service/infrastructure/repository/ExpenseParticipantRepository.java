package mariia.ushakova.event_service.infrastructure.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseParticipantEntity;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseParticipantId;

public interface ExpenseParticipantRepository extends JpaRepository<ExpenseParticipantEntity, ExpenseParticipantId> {
    
    List<ExpenseParticipantEntity> findByIdExpenseId(UUID expenseId);
    
    List<ExpenseParticipantEntity> findByIdUserId(UUID userId);
    
    boolean existsByIdExpenseIdAndIdUserId(UUID expenseId, UUID userId);
    
    @Modifying
    @Transactional
    void deleteByIdExpenseIdAndIdUserId(UUID expenseId, UUID userId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM ExpenseParticipantEntity e WHERE e.id.expenseId = :expenseId")
    void deleteAllByExpenseId(@Param("expenseId") UUID expenseId);
    
    @Query("""
    SELECT ep
    FROM ExpenseParticipantEntity ep
    JOIN ExpenseEntity e ON ep.id.expenseId = e.id
    WHERE e.eventId = :eventId
""")
List<ExpenseParticipantEntity> findAllByEventId(@Param("eventId") UUID eventId);
}