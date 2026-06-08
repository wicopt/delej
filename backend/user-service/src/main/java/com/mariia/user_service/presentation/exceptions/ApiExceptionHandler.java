package com.mariia.user_service.presentation.exceptions;

import java.time.ZonedDateTime;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = { ApiRequestException.class })
    public ResponseEntity<Object> handleApiReuestException(ApiRequestException e) {
        // Payload
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiExcecption apiExcecption = new ApiExcecption(
                e.getMessage(),
                badRequest,
                ZonedDateTime.now());
        return new ResponseEntity<>(apiExcecption, badRequest);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFound(NotFoundException e) {
        ApiExcecption response = new ApiExcecption(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                ZonedDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(ConflictExceptions.class)
    public ResponseEntity<Object> handleConflict(ConflictExceptions e) {
        ApiExcecption response = new ApiExcecption(
                e.getMessage(),
                HttpStatus.CONFLICT,
                ZonedDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleTypeMismatch(MethodArgumentTypeMismatchException e) {

        String message;

        if (e.getRequiredType() == UUID.class) {
            message = "Invalid UUID format";
        } else {
            message = "Invalid parameter type";
        }

        return buildResponse(message, HttpStatus.BAD_REQUEST, e);
    }

    private ResponseEntity<Object> buildResponse(
            String message,
            HttpStatus status,
            Exception e) {
        ApiExcecption response = new ApiExcecption(
                message,
                status,
                ZonedDateTime.now());

        return new ResponseEntity<>(response, status);
    }
}
