import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Cliente } from '../types/Cliente';
import { Vendedor } from '../types/Vendedor';
import './Vendedores.css';

interface VendedorExtendido extends Vendedor {
    clienteNombre?: string;
}

const Vendedores = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [vendedores, setVendedores] = useState<VendedorExtendido[]>([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false);

    const cargarClientes = async () => {
        try {
            const res = await axios.get('/clientes');
            setClientes(res.data);
        } catch (err) {
            console.error('Error al cargar clientes', err);
        }
    };

    const cargarVendedores = async () => {
        try {
            if (clienteId) {
                const res = await axios.get(`/vendedores/cliente/${clienteId}`);
                setVendedores(res.data);
            } else {
                const res = await axios.get('/vendedores');
                setVendedores(res.data);
            }
        } catch (err) {
            console.error('Error al cargar vendedores', err);
        }
    };

    const crearVendedor = async () => {
        if (!nombre.trim() || !clienteId) return;
        setLoading(true);
        try {
            await axios.post('/vendedores', { nombre, clienteId });
            setNombre('');
            await cargarVendedores();
        } catch (err) {
            console.error('Error al crear vendedor', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    useEffect(() => {
        cargarVendedores();
    }, [clienteId]);

    return (
        <div className="vendedores-container">
            <h2>Vendedores</h2>

            <div className="form">
                <select
                    onChange={(e) =>
                        setClienteId(e.target.value ? parseInt(e.target.value) : null)
                    }
                    defaultValue=""
                >
                    <option value="">Todos los clientes</option>
                    {clientes.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Nuevo vendedor"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    disabled={!clienteId}
                />

                <button onClick={crearVendedor} disabled={!clienteId || loading}>
                    {loading ? 'Creando...' : 'Crear'}
                </button>
            </div>

            <div className="vendedores-lista">
                {vendedores.map((v) => (
                    <div key={v.id} className="vendedor-card">
                        <strong>{v.nombre}</strong>
                        {v.clienteNombre && (
                            <small className="cliente-tag">Cliente: {v.clienteNombre}</small>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vendedores;
