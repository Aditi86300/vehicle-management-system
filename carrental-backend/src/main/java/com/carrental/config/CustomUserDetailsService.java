package com.carrental.config;

import com.carrental.entity.User;
import com.carrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

// Spring Security ko batata hai: "jab koi email se login karne ki koshish kare,
// to database me jaakar us email ka user dhoondh kar do"
@Service
@RequiredArgsConstructor   // Lombok: "final" fields ka constructor khud bana dega (dependency injection ke liye)
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // Spring Security ka apna "User" object banate hain (humare Entity "User" se alag)
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
