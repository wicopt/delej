package mariia.ushakova.event_service.infrastructure.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_expense")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseParticipantEntity {

    @EmbeddedId
    private ExpenseParticipantId id;
}

