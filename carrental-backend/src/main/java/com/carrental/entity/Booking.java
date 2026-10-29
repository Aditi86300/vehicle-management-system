package com.carrental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @ManyToOne = kayi Bookings ek hi User ki ho sakti hain
    @ManyToOne
    @JoinColumn(name = "user_id")   // ye foreign key column banayega "user_id"
    private User user;

    // @ManyToOne = kayi Bookings ek hi Car ke liye ho sakti hain (alag-alag dates par)
    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private LocalDate startDate;
    private LocalDate endDate;

    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.CONFIRMED;

    private LocalDateTime bookedAt = LocalDateTime.now();
}
