package com.busproject.busproject.controller;

import com.busproject.busproject.entity.User;
import com.busproject.busproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        
        return userRepository.findByEmail(email)
            .filter(user -> passwordEncoder.matches(password, user.getPassword()))
            .map(user -> {
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
                String token = "token-" + UUID.randomUUID().toString();
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", Map.of("id", user.getId(), "email", user.getEmail(), "role", user.getRole()));
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.status(401).body(Map.of("message", "Credenciales invalidas")));
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String role = body.getOrDefault("role", "USER");
        
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "El email ya existe"));
        }
        
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user = userRepository.save(user);
        
        String token = "token-" + UUID.randomUUID().toString();
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of("id", user.getId(), "email", user.getEmail(), "role", user.getRole()));
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("message", "No autorizado"));
        }
        return ResponseEntity.ok(Map.of("email", "admin@example.com", "role", "ADMIN"));
    }
}