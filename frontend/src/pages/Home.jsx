import React from 'react';

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="mb-4">Sistema de Campeonato</h1>
      <div className="d-flex flex-column gap-3">
        <button className="btn btn-primary w-100">
          <a href="/create-time" className="text-white text-decoration-none">Criar Time</a>
        </button>
        <button className="btn btn-secondary w-100">
          <a href="/create-atleta" className="text-white text-decoration-none">Criar Atleta</a>
        </button>
        <button className="btn btn-success w-100">
          <a href="/create-modalidade" className="text-white text-decoration-none">Criar Modalidade</a>
        </button>
        <button className="btn btn-danger w-100">
          <a href="/torneios" className="text-white text-decoration-none">Criar Torneio</a>
        </button>
      </div>
    </div>
  );
};

export default Home;
