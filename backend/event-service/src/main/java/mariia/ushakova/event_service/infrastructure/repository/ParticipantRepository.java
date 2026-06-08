package mariia.ushakova.event_service.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mariia.ushakova.event_service.infrastructure.entity.ParticipantEntity;
import mariia.ushakova.event_service.infrastructure.entity.ParticipantId;

import java.util.List;
import java.util.UUID;

@Repository
public interface ParticipantRepository extends JpaRepository<ParticipantEntity, ParticipantId> {

    @Query("SELECT p FROM ParticipantEntity p WHERE p.id.eventId = :eventId")
    List<ParticipantEntity> findByEventId(@Param("eventId") UUID eventId);

    @Query("SELECT p FROM ParticipantEntity p WHERE p.id.userId = :userId")
    List<ParticipantEntity> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM ParticipantEntity p WHERE p.id.userId = :userId AND p.id.eventId = :eventId")
    boolean existsByUserIdAndEventId(@Param("userId") UUID userId, @Param("eventId") UUID eventId);

    default void deleteParticipant(UUID userId, UUID eventId) {
        ParticipantId id = new ParticipantId(userId, eventId);
        deleteById(id);
    }

    @Query("DELETE FROM ParticipantEntity p WHERE p.id.eventId = :eventId")
    void deleteByEventId(@Param("eventId") UUID eventId);
}