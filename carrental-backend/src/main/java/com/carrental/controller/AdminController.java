package com.carrental.controller;

import com.carrental.entity.Booking;
import com.carrental.entity.Car;
import com.carrental.entity.User;
import com.carrental.repository.UserRepository;
import com.carrental.service.BookingService;
import com.carrental.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Puri class ke saare endpoints sirf ADMIN role wale user use kar sakte hain
// (SecurityConfig me humne likha tha: "/api/admin/**" -> hasRole("ADMIN"))
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CarService carService;
    private final BookingService bookingService;
    private final UserRepository userRepository;

    // ---- Car management ----

    @PostMapping("/cars")                         // Add car
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        return ResponseEntity.ok(carService.addCar(car));
    }

    @PutMapping("/cars/{id}")                      // Update car
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car) {
        return ResponseEntity.ok(carService.updateCar(id, car));
    }

    @DeleteMapping("/cars/{id}")                    // Delete car
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }

    @GetMapping("/cars")                            // View all cars (including unavailable)
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    // ---- Bookings ----

    @GetMapping("/bookings")                        // View all bookings (sab customers ki)
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // ---- Users ----

    @GetMapping("/users")                            // Manage users -> list
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")                     // Manage users -> remove a user
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
