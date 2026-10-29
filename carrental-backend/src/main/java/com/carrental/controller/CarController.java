package com.carrental.controller;

import com.carrental.entity.Car;
import com.carrental.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    // GET /api/cars        -> saari cars (Customer side "View available cars")
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carService.getAvailableCars());
    }

    // GET /api/cars/123    -> ek specific car (Customer side "Car details")
    // @PathVariable -> URL ke andar ka "{id}" is method ke "id" parameter me aa jaata hai
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }
}
