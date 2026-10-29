package com.carrental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;       // e.g. "Hyundai"
    private String model;       // e.g. "Creta"
    private String type;        // e.g. "SUV", "Sedan", "Hatchback"
    private int seats;
    private String fuelType;    // Petrol / Diesel / Electric
    private String transmission; // Manual / Automatic

    private Double pricePerDay;

    @Column(length = 1000)
    private String imageUrl;    // real car photo (URL, e.g. Unsplash link)

    private boolean available = true;  // false jab car already booked hai un dates ke liye

    private Double rating = 4.5;        // average customer rating (0-5)
    private Integer reviewCount = 0;    // total number of reviews

    @Column(length = 2000)
    private String description;
}
