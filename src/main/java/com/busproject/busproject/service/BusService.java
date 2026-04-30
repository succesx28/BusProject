package com.busproject.busproject.service;

import com.busproject.busproject.entity.Bus;
import com.busproject.busproject.repository.BusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BusService {

    private final BusRepository busRepository;

    public Page<Bus> getAll(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Optional<Bus> getById(Long id) {
        return busRepository.findById(id);
    }
}
