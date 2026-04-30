package com.busproject.busproject.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.busproject.busproject.repository.UserRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> userRepository.findByEmail(email)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole()).build())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
           .authorizeHttpRequests(auth -> auth
               .requestMatchers("/api/auth/**").permitAll()
               .requestMatchers("/h2-console/**").permitAll()
               .requestMatchers("/", "/login", "/dashboard", "/buses", "/viajes").permitAll()
               .requestMatchers("/bus", "/bus/**").permitAll()
               .requestMatchers("/viaje", "/viaje/**").permitAll()
               .anyRequest().authenticated())
           .formLogin(form -> form
               .loginPage("/login")
               .usernameParameter("email")
               .passwordParameter("password")
               .defaultSuccessUrl("/dashboard", true)
               .permitAll())
           .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
        return http.build();
    }
}