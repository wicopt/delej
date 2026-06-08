package mariia.ushakova.event_service.infrastructure.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mariia.ushakova.event_service.infrastructure.entity.ExpenseEntity;
import mariia.ushakova.event_service.domain.model.BalanceRow;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, UUID> {

    List<ExpenseEntity> findByEventId(UUID eventId);

    List<ExpenseEntity> findByEventIdAndIsActive(UUID eventId, Boolean isActive);

    List<ExpenseEntity> findByPayerId(UUID payerId);

    void deleteByEventId(UUID eventId);

    @Query(value = """
                SELECT
                    ue.user_id AS userId,
                    SUM(
                        -- Что пользователь заплатил (если он плательщик)
                        CASE WHEN ue.user_id = e.payer_id THEN e.total_cost ELSE 0 END
                        -
                        -- Что пользователь должен заплатить (доля от расхода)
                        (e.total_cost * 1.0 / cnt.count_users)
                    ) AS balance
                FROM users_expense ue
                JOIN expense e ON ue.expense_id = e.expense_id
                JOIN (
                    SELECT expense_id, COUNT(*) AS count_users
                    FROM users_expense
                    GROUP BY expense_id
                ) cnt ON cnt.expense_id = e.expense_id
                WHERE e.event_id = :eventId
                  AND e.is_active = true
                GROUP BY ue.user_id
            """, nativeQuery = true)
    List<BalanceRow> calculateBalances(@Param("eventId") UUID eventId);
}