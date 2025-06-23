import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Cliente } from '../types/Cliente';
import { Vendedor } from '../types/Vendedor';
import { ComisionResponse, VentaComisionDetalle } from '../types/ComisionResponse';
import './Comision.css';
import Swal from 'sweetalert2';

const Comision = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [vendedorId, setVendedorId] = useState<number | null>(null);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [resultado, setResultado] = useState<ComisionResponse | null>(null);

    const cargarClientes = async () => {
        const res = await axios.get('/clientes');
        setClientes(res.data);
    };

    const cargarVendedores = async (clienteId: number) => {
        const res = await axios.get(`/vendedores/cliente/${clienteId}`);
        setVendedores(res.data);
    };

    const calcularComision = async () => {
        if (!clienteId || !vendedorId || !fechaInicio || !fechaFin) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Debes seleccionar cliente, vendedor y el rango de fechas.',
            });
            return;
        }

        const body = {
            clienteId,
            vendedorId,
            fechaInicio,
            fechaFin,
        };

        try {
            const res = await axios.post('/comision/calcular', body);
            setResultado(res.data);
        } catch (error: any) {
            const mensaje = error.response?.data || 'Ocurrió un error al calcular la comisión, el vendedor no ha hecho ninguna venta.';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensaje,
            });
            setResultado(null);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    useEffect(() => {
        if (clienteId) {
            cargarVendedores(clienteId);
        } else {
            setVendedores([]);
            setVendedorId(null);
        }
    }, [clienteId]);

    return (
        <div className="comision-container">
            <h2>Calcular Comisión</h2>

            <div className="form">
                <select onChange={(e) => setClienteId(parseInt(e.target.value))} defaultValue="">
                    <option value="" disabled>Selecciona un cliente</option>
                    {clientes.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>

                <select onChange={(e) => setVendedorId(parseInt(e.target.value))} value={vendedorId ?? ''}>
                    <option value="" disabled>Selecciona un vendedor</option>
                    {vendedores.map(v => (
                        <option key={v.id} value={v.id}>{v.nombre}</option>
                    ))}
                </select>

                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

                <button onClick={calcularComision}>Calcular</button>
            </div>

            {resultado && (
                <div className="resultado">
                    <h3>Resultado</h3>
                    <p><strong>Vendedor:</strong> {resultado.nombreVendedor}</p>
                    <p><strong>Total Comisión:</strong> ${resultado.totalComision.toFixed(2)}</p>

                    {resultado.detalles.length === 0 ? (
                        <div className="sin-comisiones">
                            <p>🌊 Este vendedor no tiene comisiones registradas en el período seleccionado.</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>% Aplicado</th>
                                    <th>Comisión</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.detalles.map((d: VentaComisionDetalle, index) => (
                                    <tr key={index}>
                                        <td>{new Date(d.fecha).toLocaleDateString()}</td>
                                        <td>${d.monto.toFixed(2)}</td>
                                        <td>{d.porcentajeAplicado}%</td>
                                        <td>${d.comision.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

        </div>
    );
};

export default Comision;
