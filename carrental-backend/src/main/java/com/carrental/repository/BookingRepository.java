package com.carrental.repository;

import com.carrental.entity.Booking;
import com.carrental.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByCarId(Long carId);

    // Custom query with JPQL (Java Persistence Query Language) -- SQL jaisa hi hota hai
    // lekin table naam ki jagah Entity/class ka naam likhte hain.
    // Ye query check karti hai: kya diye gaye date-range me is car ki koi CONFIRMED booking already hai?
    @Query("SELECT b FROM Booking b WHERE b.car.id = :carId AND b.status = 'CONFIRMED' " +
           "AND b.startDate <= :endDate AND b.endDate >= :startDate")
    List<Booking> findOverlappingBookings(@Param("carId") Long carId,
                                           @Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);

    List<Booking> findByStatus(BookingStatus status);
}
