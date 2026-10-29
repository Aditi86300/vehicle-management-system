package com.carrental.repository;

import com.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByAvailableTrue();   // -> SELECT * FROM cars WHERE available = true

    List<Car> findByTypeIgnoreCase(String type);
}
