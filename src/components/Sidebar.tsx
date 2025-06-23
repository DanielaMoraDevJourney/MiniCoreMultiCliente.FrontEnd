import { Link, useLocation } from 'react-router-dom';
import { Users, Briefcase, Settings, DollarSign, BarChart2 } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="sidebar">
            <h2>MiniCore</h2>
            <nav>
                <ul>
                    <li className={isActive('/clientes') ? 'active' : ''}>
                        <Link to="/clientes">
                            <Users size={18} style={{ marginRight: '8px' }} />
                            Clientes
                        </Link>
                    </li>
                    <li className={isActive('/vendedores') ? 'active' : ''}>
                        <Link to="/vendedores">
                            <Briefcase size={18} style={{ marginRight: '8px' }} />
                            Vendedores
                        </Link>
                    </li>
                    <li className={isActive('/reglas') ? 'active' : ''}>
                        <Link to="/reglas">
                            <Settings size={18} style={{ marginRight: '8px' }} />
                            Reglas
                        </Link>
                    </li>
                    <li className={isActive('/ventas') ? 'active' : ''}>
                        <Link to="/ventas">
                            <DollarSign size={18} style={{ marginRight: '8px' }} />
                            Ventas
                        </Link>
                    </li>
                    <li className={isActive('/comision') ? 'active' : ''}>
                        <Link to="/comision">
                            <BarChart2 size={18} style={{ marginRight: '8px' }} />
                            Comisión
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
