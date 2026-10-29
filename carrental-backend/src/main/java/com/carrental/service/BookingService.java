package com.carrental.service;

import com.carrental.dto.BookingRequest;
import com.carrental.entity.Booking;
import com.carrental.entity.BookingStatus;
import com.carrental.entity.Car;
import com.carrental.entity.User;
import com.carrental.repository.BookingRepository;
import com.carrental.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;

    public Booking createBooking(User user, BookingRequest request) {
        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End date cannot be before start date");
        }

        // Check: kya is car ki already koi booking hai jo in dates se clash kar rahi hai?
        List<Booking> overlapping = bookingRepository.findOverlappingBookings(
                car.getId(), request.getStartDate(), request.getEndDate());

        if (!overlapping.isEmpty()) {
            throw new RuntimeException("Car is already booked for the selected dates");
        }

        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
        double totalPrice = days * car.getPricePerDay();

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void cancelBooking(Long bookingId, User requestingUser) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Security check: user sirf apni khud ki booking cancel kar sake (admin sabki kar sakta hai)
        boolean isOwner = booking.getUser().getId().equals(requestingUser.getId());
        boolean isAdmin = requestingUser.getRole().name().equals("ADMIN");

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("You are not allowed to cancel this booking");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}
