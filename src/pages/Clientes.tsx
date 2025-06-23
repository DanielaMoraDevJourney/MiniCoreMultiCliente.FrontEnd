import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Cliente } from '../types/Cliente';
import './Clientes.css';

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false);

    const cargarClientes = async () => {
        try {
            const res = await axios.get('/clientes');
            setClientes(res.data);
        } catch (error) {
            console.error('Error al cargar clientes', error);
        }
    };

    const crearCliente = async () => {
        if (!nombre.trim()) return;
        setLoading(true);
        try {
            await axios.post('/clientes', { nombre });
            setNombre('');
            await cargarClientes();
        } catch (error) {
            console.error('Error al crear cliente', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    return (
        <div className="clientes-container">
            <h2>Clientes</h2>

            <div className="form">
                <input
                    type="text"
                    placeholder="Nuevo cliente"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button onClick={crearCliente} disabled={loading}>
                    {loading ? 'Creando...' : 'Crear'}
                </button>
            </div>

            <div className="clientes-lista">
                {clientes.map((c) => (
                    <div key={c.id} className="cliente-card">
                        <strong>{c.nombre}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clientes;
