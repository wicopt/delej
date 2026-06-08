package mariia.ushakova.event_service.presentation.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mariia.ushakova.event_service.application.services.BalanceService; 
import mariia.ushakova.event_service.presentation.dto.responce.BalanceResponse;

@RestController
@RequestMapping("/balance")
@RequiredArgsConstructor
public class BalanceController {

    private final BalanceService balanceService;  // Исправлено название поля

    @GetMapping("/{eventId}")
    public List<BalanceResponse> getEventBalances(@PathVariable UUID eventId) {  // Исправлен тип возвращаемого значения и название метода
        return balanceService.calculateEventBalances(eventId);  // Исправлен вызов метода
    }
}