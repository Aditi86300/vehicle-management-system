package com.carrental.controller;

import com.carrental.dto.BookingRequest;
import com.carrental.entity.Booking;
import com.carrental.entity.User;
import com.carrental.repository.UserRepository;
import com.carrental.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    // Authentication object Spring Security khud inject kar deta hai -
    // isme us user ki info hoti hai jiska JWT token valid nikla (JwtAuthFilter yaad hai?)
    private User currentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // POST /api/bookings  -> "Book a car"
    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest request,
                                                  Authentication authentication) {
        User user = currentUser(authentication);
        Booking booking = bookingService.createBooking(user, request);
        return ResponseEntity.ok(booking);
    }

    // GET /api/bookings/my  -> "View bookings" (logged-in customer ki apni bookings)
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(Authentication authentication) {
        User user = currentUser(authentication);
        return ResponseEntity.ok(bookingService.getBookingsForUser(user.getId()));
    }

    // DELETE /api/bookings/5  -> "Cancel booking"
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id, Authentication authentication) {
        User user = currentUser(authentication);
        bookingService.cancelBooking(id, user);
        return ResponseEntity.ok("Booking cancelled successfully");
    }
}
