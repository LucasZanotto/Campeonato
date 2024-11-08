import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create-time">Criar Time</Link></li>
        <li><Link to="/create-atleta">Criar Atleta</Link></li>
        <li><Link to="/create-torneio">Criar Torneio</Link></li>
        <li><Link to="/torneios">Ver Torneios</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
