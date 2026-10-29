package com.carrental.config;

import com.carrental.entity.Role;
import com.carrental.entity.User;
import com.carrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// "CommandLineRunner" = iska "run()" method app start hote hi EK baar khud-ba-khud chalta hai.
// Yahan hum ek default ADMIN user bana rahe hain taaki turant admin panel test kar sako.
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@carrental.com")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@carrental.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // login: admin@carrental.com / admin123
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println(">>> Default admin created: admin@carrental.com / admin123");
        }
    }
}
