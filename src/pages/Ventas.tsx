// src/pages/Ventas.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Cliente } from '../types/Cliente';
import { Vendedor } from '../types/Vendedor';
import './Ventas.css';

const Ventas = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [vendedorId, setVendedorId] = useState<number | null>(null);
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [ventasRealizadas, setVentasRealizadas] = useState<any[]>([]);

    const cargarClientes = async () => {
        try {
            const res = await axios.get('/clientes');
            setClientes(res.data);
        } catch (err) {
            console.error('Error al cargar clientes', err);
        }
    };

    const cargarVendedores = async (id: number) => {
        try {
            const res = await axios.get(`/vendedores/cliente/${id}`);
            setVendedores(res.data);
        } catch (err) {
            console.error('Error al cargar vendedores', err);
        }
    };

    const registrarVenta = async () => {
        if (!vendedorId || !fecha || monto <= 0) return;
        setLoading(true);
        try {
            await axios.post('/ventas', {
                vendedorId,
                fecha,
                monto
            });
            setVentasRealizadas(prev => [...prev, { vendedorId, fecha, monto }]);
            setFecha('');
            setMonto(0);
        } catch (err) {
            console.error('Error al registrar venta', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    useEffect(() => {
        if (clienteId) cargarVendedores(clienteId);
    }, [clienteId]);

    return (
        <div className="ventas-container">
            <h2>Registrar Venta</h2>
            <div className="form">
                <select onChange={(e) => setClienteId(parseInt(e.target.value))} defaultValue="">
                    <option value="" disabled>Selecciona un cliente</option>
                    {clientes.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>

                <select onChange={(e) => setVendedorId(parseInt(e.target.value))} defaultValue="" disabled={!clienteId}>
                    <option value="" disabled>Selecciona un vendedor</option>
                    {vendedores.map((v) => (
                        <option key={v.id} value={v.id}>{v.nombre}</option>
                    ))}
                </select>

                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} disabled={!vendedorId} />
                <input type="number" placeholder="Monto" value={monto} onChange={(e) => setMonto(Number(e.target.value))} disabled={!vendedorId} />

                <button onClick={registrarVenta} disabled={!vendedorId || loading}>
                    {loading ? 'Registrando...' : 'Registrar Venta'}
                </button>
            </div>

            <div className="ventas-lista">
                <h3>Ventas registradas</h3>
                {ventasRealizadas.map((v, i) => (
                    <div key={i} className="venta-card">
                        <p><strong>ID Vendedor:</strong> {v.vendedorId}</p>
                        <p><strong>Fecha:</strong> {new Date(v.fecha).toLocaleDateString()}</p>
                        <p><strong>Monto:</strong> ${v.monto}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ventas;