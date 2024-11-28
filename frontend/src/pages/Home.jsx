import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Sistema de Campeonato</h1>
      <p>Escolha uma opção para continuar:</p>
      <div>
        <button><a href="/create-time">Criar Time</a></button>
        <button><a href="/create-atleta">Criar Atleta</a></button>
        <button><a href="/create-modalidade">Criar Modalidade</a></button>
        <button><a href="/torneios">Criar Torneio</a></button>
      </div>
    </div>
  );
};

export default Home;
