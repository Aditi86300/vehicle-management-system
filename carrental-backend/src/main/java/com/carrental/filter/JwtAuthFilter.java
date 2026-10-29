package com.carrental.filter;

import com.carrental.config.CustomUserDetailsService;
import com.carrental.config.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// "Filter" = har single HTTP request server tak pahunchne se PEHLE isse guzarta hai.
// OncePerRequestFilter -> guarantee karta hai ki ye filter har request pe sirf EK baar chale.
//
// Kaam: request ke header me "Authorization: Bearer <token>" check karna,
// token valid hai to us user ko "logged in" mark kar dena is request ke liye.
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Agar header nahi hai ya "Bearer " se start nahi hota -> aage badh jao (ye request public ho sakti hai)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);     // "Bearer " (7 characters) hata kar sirf token lo

        // Token expired/corrupt/purani-key-se-bana ho sakta hai (jaise backend restart hone ke baad
        // ka stale token). Aisa token parse karte waqt JJWT exception throw karta hai - use yahin
        // pakad lo, warna PURI request (public endpoints jaise /api/cars bhi) crash ho jaati hai.
        try {
            final String email = jwtUtil.extractEmail(token);

            // Agar email mil gayi aur abhi tak koi login mark nahi hua is request me
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtUtil.isTokenValid(token, email)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Spring Security ke "context" me daal do -> ab ye request "authenticated" maani jayegi
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception ex) {
            // Invalid/expired token -> is request ko bas "not logged in" treat karo, crash mat karo
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);   // request ko aage jaane do
    }
}
