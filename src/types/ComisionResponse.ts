export interface VentaComisionDetalle {
    fecha: string;
    monto: number;
    porcentajeAplicado: number;
    comision: number;
}

export interface ComisionResponse {
    clienteId: number;
    vendedorId: number;
    nombreVendedor: string;
    totalComision: number;
    detalles: VentaComisionDetalle[];
}
