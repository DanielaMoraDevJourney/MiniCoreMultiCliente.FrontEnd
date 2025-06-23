import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Clientes from './pages/Clientes';
import Vendedores from './pages/Vendedores';
import Reglas from './pages/Reglas';
import Comision from './pages/Comision';
import Ventas from './pages/Ventas';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/vendedores" element={<Vendedores />} />
            <Route path="/reglas" element={<Reglas />} />
            <Route path="/comision" element={<Comision />} />
            <Route path="/ventas" element={<Ventas />} />




          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
