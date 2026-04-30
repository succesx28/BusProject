package com.busproject.busproject.controller;

import com.busproject.busproject.entity.Bus;
import com.busproject.busproject.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bus")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<Page<Bus>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(busService.getAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getById(@PathVariable Long id) {
        return busService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
