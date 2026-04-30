package com.busproject.busproject.repository;

import com.busproject.busproject.entity.BusMarca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusMarcaRepository extends JpaRepository<BusMarca, Long> {
    Optional<BusMarca> findByNombre(String nombre);
}
