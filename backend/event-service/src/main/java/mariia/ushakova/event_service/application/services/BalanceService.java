package mariia.ushakova.event_service.application.services;

import java.util.*;
import java.util.stream.Collectors;  

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mariia.ushakova.event_service.infrastructure.entity.ExpenseEntity;
import mariia.ushakova.event_service.infrastructure.repository.ExpenseRepository;
import mariia.ushakova.event_service.infrastructure.client.UserServiceClient;
import mariia.ushakova.event_service.presentation.dto.responce.BalanceResponse;
import mariia.ushakova.event_service.presentation.dto.responce.UserResponse;
import mariia.ushakova.event_service.domain.model.BalanceRow;

@RequiredArgsConstructor
@Service
@Slf4j
public class BalanceService {

    private final ExpenseRepository expenseRepository;
    private final UserServiceClient userServiceClient;

    public List<BalanceResponse> calculateEventBalances(UUID eventId) {
        log.info("=== Starting balance calculation for event: {} ===", eventId);
        long startTime = System.currentTimeMillis();
        
        // 1. Получаем балансы из БД
        log.debug("Fetching balance rows from database for event: {}", eventId);
        List<BalanceRow> balanceRows = expenseRepository.calculateBalances(eventId);
        
        if (balanceRows.isEmpty()) {
            log.warn("No balance rows found for event: {}", eventId);
            return List.of();
        }
        
        log.info("Found {} balance rows for event: {}", balanceRows.size(), eventId);
        log.debug("Balance rows: {}", balanceRows);

        // 2. Получаем данные пользователей
        List<UUID> userIds = balanceRows.stream()
                .map(BalanceRow::getUserId)
                .collect(Collectors.toList());
        
        log.info("Fetching user data for {} users: {}", userIds.size(), userIds);
        
        Map<UUID, UserResponse> userMap = userServiceClient.getUsersByIds(userIds)
                .stream()
                .collect(Collectors.toMap(UserResponse::getUserId, u -> u));
        
        log.info("Successfully fetched {} user records", userMap.size());

        // 3. Определяем валюту (берём из первого активного расхода события)
        log.debug("Determining currency for event: {}", eventId);
        String currency = expenseRepository.findByEventIdAndIsActive(eventId, true)
                .stream()
                .findFirst()
                .map(ExpenseEntity::getCurrency)
                .orElse("USD");
        
        log.info("Currency for event {}: {}", eventId, currency);

        // 4. Строим изменяемую карту балансов: userId -> баланс (>0 кредитор, <0 должник)
        Map<UUID, Double> balanceMap = new HashMap<>();
        for (BalanceRow row : balanceRows) {
            balanceMap.put(row.getUserId(), row.getBalance());
        }
        
        log.info("Initial balance map: {}", formatBalanceMap(balanceMap));

        // 5. Жадный алгоритм минимизации транзакций
        List<BalanceResponse> result = new ArrayList<>();

        // Разделяем на кредиторов (баланс > 0) и должников (баланс < 0)
        PriorityQueue<Map.Entry<UUID, Double>> creditors = new PriorityQueue<>(
                (a, b) -> Double.compare(b.getValue(), a.getValue()) // по убыванию
        );
        PriorityQueue<Map.Entry<UUID, Double>> debtors = new PriorityQueue<>(
                (a, b) -> Double.compare(a.getValue(), b.getValue()) // по возрастанию (самые большие долги первыми)
        );

        int creditorsCount = 0;
        int debtorsCount = 0;
        
        for (Map.Entry<UUID, Double> entry : balanceMap.entrySet()) {
            if (entry.getValue() > 0.01) {
                creditors.offer(entry);
                creditorsCount++;
                log.debug("Creditor: userId={}, amount={}", entry.getKey(), entry.getValue());
            } else if (entry.getValue() < -0.01) {
                debtors.offer(entry);
                debtorsCount++;
                log.debug("Debtor: userId={}, amount={}", entry.getKey(), entry.getValue());
            } else {
                log.debug("User {} has zero balance ({}), skipping", entry.getKey(), entry.getValue());
            }
        }
        
        log.info("Split into {} creditors and {} debtors", creditorsCount, debtorsCount);

        // Жадно сопоставляем кредиторов и должников
        int transactionCount = 0;
        while (!creditors.isEmpty() && !debtors.isEmpty()) {
            Map.Entry<UUID, Double> creditor = creditors.poll();
            Map.Entry<UUID, Double> debtor = debtors.poll();

            double creditAmount = creditor.getValue();
            double debtAmount = -debtor.getValue(); // делаем положительным
            
            log.debug("Processing transaction #{}: Creditor={} (owns {}), Debtor={} (owes {})", 
                    transactionCount + 1, creditor.getKey(), creditAmount, debtor.getKey(), debtAmount);

            double settledAmount = Math.min(creditAmount, debtAmount);

            // Округляем до 2 знаков
            settledAmount = Math.round(settledAmount * 100.0) / 100.0;
            
            log.info("Transaction #{}: User {} should pay {} {} to user {}", 
                    transactionCount + 1, 
                    debtor.getKey(), 
                    settledAmount, 
                    currency, 
                    creditor.getKey());

            result.add(BalanceResponse.builder()
                    .creditor(userMap.get(creditor.getKey()))
                    .borrower(userMap.get(debtor.getKey()))
                    .amount(settledAmount)
                    .currensy(currency)
                    .build());

            double remainingCredit = creditAmount - settledAmount;
            double remainingDebt = debtAmount - settledAmount;

            // Если остаток значимый — возвращаем обратно в очередь
            if (remainingCredit > 0.01) {
                log.debug("Creditor {} still has remaining credit: {}", creditor.getKey(), remainingCredit);
                creditors.offer(Map.entry(creditor.getKey(), remainingCredit));
            }
            if (remainingDebt > 0.01) {
                log.debug("Debtor {} still has remaining debt: {}", debtor.getKey(), remainingDebt);
                debtors.offer(Map.entry(debtor.getKey(), -remainingDebt));
            }
            
            transactionCount++;
        }

        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;
        
        log.info("=== Balance calculation completed for event: {} ===", eventId);
        log.info("Total transactions to settle: {}", result.size());
        log.info("Execution time: {} ms", executionTime);
        
        if (result.isEmpty()) {
            log.info("No settlements needed - all balances are zero");
        } else {
            log.debug("Settlement details: {}", result);
        }
        
        return result;
    }
    
    /**
     * Форматирует карту балансов для логирования
     */
    private String formatBalanceMap(Map<UUID, Double> balanceMap) {
        return balanceMap.entrySet().stream()
                .map(entry -> String.format("%s=%.2f", entry.getKey(), entry.getValue()))
                .collect(Collectors.joining(", ", "{", "}"));
    }
}