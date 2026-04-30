package com.busproject.busproject.service;

import com.busproject.busproject.dto.BusRequest;
import com.busproject.busproject.entity.Bus;
import com.busproject.busproject.entity.BusMarca;
import com.busproject.busproject.repository.BusMarcaRepository;
import com.busproject.busproject.repository.BusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BusService {

    private final BusRepository busRepository;
    private final BusMarcaRepository busMarcaRepository;

    public List<Bus> getAll() {
        return busRepository.findAll();
    }

    public Page<Bus> getAll(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Optional<Bus> getById(Long id) {
        return busRepository.findById(id);
    }

    public Bus create(BusRequest request) {
        BusMarca marca = busMarcaRepository.findById(request.getMarcaId())
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + request.getMarcaId()));

        Bus bus = new Bus();
        bus.setNumeroBus(request.getNumeroBus());
        bus.setPlaca(request.getPlaca());
        bus.setCaracteristicas(request.getCaracteristicas());
        bus.setMarca(marca);
        bus.setActivo(request.isActivo());

        return busRepository.save(bus);
    }

    public List<BusMarca> getAllMarcas() {
        return busMarcaRepository.findAll();
    }

    public BusMarca createMarca(String nombre) {
        BusMarca marca = new BusMarca();
        marca.setNombre(nombre);
        return busMarcaRepository.save(marca);
    }
}
