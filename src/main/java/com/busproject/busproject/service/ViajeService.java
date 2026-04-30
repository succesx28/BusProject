package com.busproject.busproject.service;

import com.busproject.busproject.dto.ViajeRequest;
import com.busproject.busproject.entity.Viaje;
import com.busproject.busproject.repository.BusRepository;
import com.busproject.busproject.repository.ViajeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ViajeService {

    private final ViajeRepository viajeRepository;
    private final BusRepository busRepository;

    public Page<Viaje> getAll(Pageable pageable) {
        return viajeRepository.findAll(pageable);
    }

    public Optional<Viaje> getById(Long id) {
        return viajeRepository.findById(id);
    }

    public Viaje create(ViajeRequest req) {
        Viaje viaje = new Viaje();
        viaje.setOrigen(req.getOrigen());
        viaje.setDestino(req.getDestino());
        viaje.setFechaHoraSalida(req.getFechaHoraSalida());
        viaje.setFechaHoraLlegadaEstimada(req.getFechaHoraLlegadaEstimada());
        if (req.getBusId() != null) {
            busRepository.findById(req.getBusId()).ifPresent(viaje::setBus);
        }
        return viajeRepository.save(viaje);
    }
}
