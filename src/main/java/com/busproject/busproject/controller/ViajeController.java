package com.busproject.busproject.controller;

import com.busproject.busproject.dto.ViajeRequest;
import com.busproject.busproject.entity.Viaje;
import com.busproject.busproject.service.ViajeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/viaje")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ViajeController {

    private final ViajeService viajeService;

    @GetMapping
    public ResponseEntity<Page<Viaje>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(viajeService.getAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Viaje> getById(@PathVariable Long id) {
        return viajeService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Viaje> create(@RequestBody ViajeRequest req) {
        return ResponseEntity.ok(viajeService.create(req));
    }
}
