import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TorneioPartidas = () => {
  const { id } = useParams(); // Pega o parâmetro id da URL
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Faz a requisição para pegar as partidas do torneio
    axios.get(`http://localhost:3333/torneios/${id}/partidas`)
      .then(response => {
        setPartidas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as partidas:', error);
        setLoading(false);
      });
  }, [id]);  // O efeito depende do id para ser chamado toda vez que mudar o torneio

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (partidas.length === 0) {
    return <div>Nenhuma partida encontrada para este torneio.</div>;
  }

  return (
    <div>
      <h1>Partidas do Torneio</h1>
      <ul>
        {partidas.map((partida) => (
          <li key={partida.id}>
            <h3>Partida {partida.id}</h3>
            <p>Data: {partida.data}</p>
            <p>Resultado: {partida.resultado}</p>
            {/* Adicione mais detalhes conforme os campos da sua tabela */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TorneioPartidas;
