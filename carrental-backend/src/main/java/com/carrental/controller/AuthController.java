package com.carrental.controller;

import com.carrental.dto.AuthResponse;
import com.carrental.dto.LoginRequest;
import com.carrental.dto.RegisterRequest;
import com.carrental.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// @RestController = @Controller + @ResponseBody
//   -> "@Controller" bolta hai ye class HTTP requests handle karegi
//   -> "@ResponseBody" bolta hai jo bhi method return karega, wo seedha JSON me convert ho kar response me jayega
//      (HTML page nahi dikhega, sirf raw JSON data)
@RestController
@RequestMapping("/api/auth")   // is controller ke saare endpoints "/api/auth" se shuru honge
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // @PostMapping = ye method sirf HTTP POST request handle karega
    // Poora path banega: POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        // @RequestBody -> frontend jo JSON bhejega usse Java object (RegisterRequest) me convert kar do
        // @Valid -> DTO ke andar likhe @NotBlank, @Email jaise rules ko check karo
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);   // HTTP 200 OK + response body me JSON
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
