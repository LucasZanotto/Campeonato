import React from 'react';
import { Link } from 'react-router-dom';

const CardTorneio = ({ torneio }) => {
  return (
    <div>
      <h3>{torneio.nome}</h3>
      <Link to={`/torneio/${torneio.id}`}>Ver Detalhes</Link>
    </div>
  );
};

export default CardTorneio;
