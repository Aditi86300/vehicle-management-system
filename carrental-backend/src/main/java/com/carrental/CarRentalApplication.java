package com.carrental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication = ye ek "combo" annotation hai
// Iske andar 3 cheeze chupi hoti hain:
// 1) @Configuration -> ye class configuration define kar sakti hai
// 2) @EnableAutoConfiguration -> Spring khud-ba-khud sab kuch (DB, Web server) setup kar deta hai
// 3) @ComponentScan -> Spring is package ke andar saare @Controller, @Service, @Repository dhoondh leta hai
@SpringBootApplication
public class CarRentalApplication {

    // Java me har program ki entry point "main" method hoti hai.
    // Jab hum "run" karte hain, sabse pehle ye method chalta hai.
    public static void main(String[] args) {
        SpringApplication.run(CarRentalApplication.class, args);
        // ye line poore Spring Boot server ko start karti hai (default port: 8080)
    }
}
