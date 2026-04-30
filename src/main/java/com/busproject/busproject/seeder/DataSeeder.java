package com.busproject.busproject.seeder;

import com.busproject.busproject.entity.Bus;
import com.busproject.busproject.entity.BusMarca;
import com.busproject.busproject.entity.User;
import com.busproject.busproject.repository.BusMarcaRepository;
import com.busproject.busproject.repository.BusRepository;
import com.busproject.busproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BusMarcaRepository busMarcaRepository;
    private final BusRepository busRepository;

    @Override
    public void run(String... args) {
        // Seed admin user
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("12345678"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }

        // Seed bus marcas
        if (busMarcaRepository.count() == 0) {
            busMarcaRepository.saveAll(List.of(
                new BusMarca(null, "Volvo"),
                new BusMarca(null, "Scania"),
                new BusMarca(null, "Fiat"),
                new BusMarca(null, "Mercedes-Benz")
            ));
        }

        // Seed buses
        if (busRepository.count() == 0) {
            BusMarca volvo = busMarcaRepository.findByNombre("Volvo").orElseThrow();
            BusMarca scania = busMarcaRepository.findByNombre("Scania").orElseThrow();
            BusMarca fiat = busMarcaRepository.findByNombre("Fiat").orElseThrow();
            BusMarca mercedes = busMarcaRepository.findByNombre("Mercedes-Benz").orElseThrow();

            busRepository.saveAll(List.of(
                createBus("001", "ABC-123", "42 asientos, A/C", volvo, true),
                createBus("002", "DEF-456", "36 asientos", scania, true),
                createBus("003", "GHI-789", "50 asientos, A/C, WiFi", mercedes, true),
                createBus("004", "JKL-012", "40 asientos", fiat, false),
                createBus("005", "MNO-345", "42 asientos, A/C", volvo, true)
            ));
        }
    }

    private Bus createBus(String numeroBus, String placa, String caracteristicas,
                          BusMarca marca, boolean activo) {
        Bus bus = new Bus();
        bus.setNumeroBus(numeroBus);
        bus.setPlaca(placa);
        bus.setCaracteristicas(caracteristicas);
        bus.setMarca(marca);
        bus.setActivo(activo);
        return bus;
    }
}
