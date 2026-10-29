package com.carrental.repository;

import com.carrental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// "Repository" = database se baat karne wali layer.
// JpaRepository<User, Long> ka matlab:
//   - User  = kaunsi entity/table handle karni hai
//   - Long  = uski primary key (id) ka data type
//
// JpaRepository extend karte hi humein FREE me mil jaate hain:
//   save(), findAll(), findById(), deleteById(), count() ... likhna bhi nahi padta!
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA ka magic: method ka NAAM padh kar khud SQL query bana leta hai.
    // "findByEmail" -> SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
