package mariia.ushakova.event_service.infrastructure.entity;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "expense")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "expense_id")
    private UUID expenseId;

    @Column(name = "event_id", nullable = false)
    private UUID eventId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "payer_id", nullable = false)
    private UUID payerId;

    @Column(name = "date_of_payment", nullable = false)
    private LocalDate dateOfPayment;

    @Column(name = "total_cost", nullable = false)
    private Long totalCost;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "category", nullable = false, length = 50)
    @Builder.Default
    private String category = "other";

    @Column(name = "split_type", nullable = false, length = 20)
    @Builder.Default
    private String splitType = "equal";

}