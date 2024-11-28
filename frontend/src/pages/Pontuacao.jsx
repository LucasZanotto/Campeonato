import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Pontuacao = () => {
  const { id } = useParams();
  const [pontuacoes, setPontuacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPontuacao = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/pontuacoes/${id}/pontuacao`);
        setPontuacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pontuação:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPontuacao();
  }, [id]);

  if (loading) {
    return <div>Carregando pontuação...</div>;
  }

  return (
    <div>
      <h1>Pontuação do Torneio</h1>
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Total de Pontos</th>
          </tr>
        </thead>
        <tbody>
          {pontuacoes.map((pontuacao) => (
            <tr key={pontuacao.time_id || pontuacao.atleta_id}>
              <td>{pontuacao.time_id || pontuacao.atleta_id}</td>
              <td>{pontuacao.nome_time || pontuacao.nome_atleta}</td>
              <td>{pontuacao.total_pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pontuacao;
