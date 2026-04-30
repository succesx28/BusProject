package com.busproject.busproject.dto;

import lombok.Data;

@Data
public class BusRequest {

    private String numeroBus;

    private String placa;

    private String caracteristicas;

    private Long marcaId;

    private boolean activo;
}
