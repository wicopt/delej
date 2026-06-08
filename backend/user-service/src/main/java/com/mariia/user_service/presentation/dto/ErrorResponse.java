package com.mariia.user_service.presentation.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String errorCode;
    private String message;
    private String path;
    private Map<String, String> validationErrors;
    
    // Конструктор для простых ошибок
    public ErrorResponse(String errorCode, String message) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        this.message = message;
    }
    
    // Конструктор с полным набором
    public ErrorResponse(int status, String errorCode, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
    }
}