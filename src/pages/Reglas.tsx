import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Cliente } from '../types/Cliente';
import './Reglas.css';

interface Regla {
    id: number;
    minMonto: number;
    maxMonto: number;
    porcentaje: number;
}

const Reglas = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [reglas, setReglas] = useState<Regla[]>([]);
    const [form, setForm] = useState({ minMonto: '', maxMonto: '', porcentaje: '' });

    const cargarClientes = async () => {
        try {
            const res = await axios.get('/clientes');
            setClientes(res.data);
        } catch (err) {
            console.error('Error al cargar clientes', err);
        }
    };

    const cargarReglas = async (id: number) => {
        try {
            const res = await axios.get(`/reglas/${id}/reglas`);
            setReglas(res.data);
        } catch (err) {
            console.error('Error al cargar reglas', err);
        }
    };

    const crearRegla = async () => {
        const { minMonto, maxMonto, porcentaje } = form;
        if (!clienteId || !minMonto || !maxMonto || !porcentaje) return;

        try {
            await axios.post('/reglas', {
                clienteId,
                minMonto: parseFloat(minMonto),
                maxMonto: parseFloat(maxMonto),
                porcentaje: parseFloat(porcentaje),
            });
            setForm({ minMonto: '', maxMonto: '', porcentaje: '' });
            await cargarReglas(clienteId);
        } catch (err) {
            console.error('Error al crear regla', err);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    useEffect(() => {
        if (clienteId) cargarReglas(clienteId);
    }, [clienteId]);

    return (
        <div className="reglas-container">
            <h2>Reglas de Comisión</h2>

            <div className="form">
                <select onChange={(e) => setClienteId(parseInt(e.target.value))} defaultValue="">
                    <option value="" disabled>Selecciona un cliente</option>
                    {clientes.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Min monto"
                    value={form.minMonto}
                    onChange={(e) => setForm({ ...form, minMonto: e.target.value })}
                    disabled={!clienteId}
                />
                <input
                    type="number"
                    placeholder="Max monto"
                    value={form.maxMonto}
                    onChange={(e) => setForm({ ...form, maxMonto: e.target.value })}
                    disabled={!clienteId}
                />
                <input
                    type="number"
                    placeholder="% comisión"
                    value={form.porcentaje}
                    onChange={(e) => setForm({ ...form, porcentaje: e.target.value })}
                    disabled={!clienteId}
                />
                <button onClick={crearRegla} disabled={!clienteId}>
                    Crear
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Min Monto</th>
                        <th>Max Monto</th>
                        <th>% Comisión</th>
                    </tr>
                </thead>
                <tbody>
                    {reglas.map((r) => (
                        <tr key={r.id}>
                            <td>${r.minMonto}</td>
                            <td>${r.maxMonto}</td>
                            <td>{r.porcentaje}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reglas;
