package com.carrental.exception;

import com.carrental.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// "@RestControllerAdvice" = ye class SAARE controllers ko "watch" karti hai.
// Jahan bhi kisi controller me exception (error) aayega, ye class use pakad kar
// ek clean, consistent JSON error response bana degi -- taaki frontend ko hamesha
// ek predictable format me error mile, na ki ugly stack-trace HTML page.
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Jab koi manually "throw new RuntimeException(...)" karta hai (jaise humne Services me kiya)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntimeException(RuntimeException ex) {
        ApiError error = new ApiError(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }

    // Jab @Valid validation fail ho (jaise @NotBlank, @Email)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        ApiError error = new ApiError(HttpStatus.BAD_REQUEST.value(), message);
        return ResponseEntity.badRequest().body(error);
    }
}
