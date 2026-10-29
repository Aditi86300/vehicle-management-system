package com.carrental.service;

import com.carrental.entity.Car;
import com.carrental.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();          // SELECT * FROM cars
    }

    public List<Car> getAvailableCars() {
        return carRepository.findByAvailableTrue();
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
    }

    public Car addCar(Car car) {
        return carRepository.save(car);           // id null ho to INSERT karta hai
    }

    public Car updateCar(Long id, Car updatedCar) {
        Car existing = getCarById(id);
        existing.setBrand(updatedCar.getBrand());
        existing.setModel(updatedCar.getModel());
        existing.setType(updatedCar.getType());
        existing.setSeats(updatedCar.getSeats());
        existing.setFuelType(updatedCar.getFuelType());
        existing.setTransmission(updatedCar.getTransmission());
        existing.setPricePerDay(updatedCar.getPricePerDay());
        existing.setImageUrl(updatedCar.getImageUrl());
        existing.setDescription(updatedCar.getDescription());
        existing.setAvailable(updatedCar.isAvailable());
        existing.setRating(updatedCar.getRating());
        existing.setReviewCount(updatedCar.getReviewCount());
        return carRepository.save(existing);       // id already hai to UPDATE karta hai
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
