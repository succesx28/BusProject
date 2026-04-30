package com.busproject.busproject.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViajeRequest {
    private String origen;
    private String destino;
    private LocalDateTime fechaHoraSalida;
    private LocalDateTime fechaHoraLlegadaEstimada;
    private Long busId;
}
