package mariia.ushakova.event_service.infrastructure.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mariia.ushakova.event_service.infrastructure.entity.EventEntity;

public interface EventRepository extends JpaRepository<EventEntity, UUID> {

    @Query("SELECT DISTINCT e FROM EventEntity e " +
           "INNER JOIN ParticipantEntity p ON e.eventId = p.id.eventId " +
           "WHERE p.id.userId = :userId " +
           "ORDER BY e.createdAt DESC")
    List<EventEntity> findEventsByUserId(@Param("userId") UUID userId);
}
