package com.carrental.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

// "Component" = ye class bhi Spring khud object bana kar apne "container" me rakh lega,
// taaki jahan zaroorat ho hum ise seedha "inject" (use) kar sakein (@Autowired / constructor).
@Component
public class JwtUtil {

    // Secret key jisse token "sign" (lock) hota hai. FIXED string se banaya taaki backend restart
    // hone par bhi purane tokens invalid na ho jaayen (Keys.secretKeyFor() har restart par NAYI
    // random key banata tha, jisse purana login token turant kaam karna band kar deta tha).
    // Real production project me ye string .env / application.properties se aani chahiye, hardcode nahi.
    private static final String SECRET = "carrental-demo-secret-key-please-change-in-production-32bytes-min";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private static final long EXPIRATION_MS = 1000 * 60 * 60 * 24; // 24 ghante

    // Login successful hone par ye method call hoti hai -> ek naya JWT token banata hai
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)                       // token ke andar user ki email store karo
                .setIssuedAt(new Date())                  // kab bana
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS)) // kab expire hoga
                .signWith(key)                             // secret key se sign(lock) karo
                .compact();                                 // final string bana do
    }

    // Token ke andar se email nikalna
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return extractedEmail.equals(email) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
        return resolver.apply(claims);
    }
}
