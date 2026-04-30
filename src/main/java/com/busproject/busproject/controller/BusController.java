package com.busproject.busproject.controller;

import com.busproject.busproject.dto.BusRequest;
import com.busproject.busproject.entity.Bus;
import com.busproject.busproject.entity.BusMarca;
import com.busproject.busproject.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bus")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<Page<Bus>> getAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(busService.getAll(PageRequest.of(page, size)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bus>> getAll() {
        return ResponseEntity.ok(busService.getAll());
    }

    @GetMapping("/marcas")
    public ResponseEntity<List<BusMarca>> getAllMarcas() {
        return ResponseEntity.ok(busService.getAllMarcas());
    }

    @PostMapping("/marcas")
    public ResponseEntity<BusMarca> createMarca(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(busService.createMarca(body.get("nombre")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getById(@PathVariable Long id) {
        return busService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Bus> create(@RequestBody BusRequest request) {
        return ResponseEntity.ok(busService.create(request));
    }
}
