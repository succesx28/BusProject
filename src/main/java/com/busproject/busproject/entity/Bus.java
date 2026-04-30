package com.busproject.busproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroBus;

    private String placa;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime fechaCreacion;

    private String caracteristicas;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private BusMarca marca;

    private boolean activo;
}
