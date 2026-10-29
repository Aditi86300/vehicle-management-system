package com.carrental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// "Entity" = ek Java class jo database ki ek TABLE ko represent karti hai.
// Har object (row) is class ka, database table "users" ki ek row banega.

@Entity                     // Bolta hai Spring/Hibernate ko: "isko table bana do"
@Table(name = "users")      // table ka naam explicitly "users" rakho
@Data                       // Lombok: getters, setters, toString, equals sab khud bana dega
@NoArgsConstructor          // empty constructor: new User()
@AllArgsConstructor         // sab fields wala constructor: new User(id, name, ...)
public class User {

    @Id                                              // ye column PRIMARY KEY hai
    @GeneratedValue(strategy = GenerationType.IDENTITY) // value auto-increment hogi (1,2,3...)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Enter a valid email")
    @Column(unique = true, nullable = false)          // email har user ke liye unique honi chahiye
    private String email;

    @NotBlank
    private String password;   // yaha hamesha ENCRYPTED (hashed) password store hoga, plain text nahi

    @Enumerated(EnumType.STRING)  // enum ko DB me text ("CUSTOMER"/"ADMIN") ki tarah store karo
    private Role role = Role.CUSTOMER;   // default naya user CUSTOMER hi hota hai

    private LocalDateTime createdAt = LocalDateTime.now();
}
