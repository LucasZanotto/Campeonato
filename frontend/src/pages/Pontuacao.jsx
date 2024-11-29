import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Pontuacao = () => {
  const { id } = useParams();
  const [pontuacoes, setPontuacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPontuacao = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/pontuacoes/${id}/pontuacao`
        );
        setPontuacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pontuação:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPontuacao();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Carregando pontuação...</h2>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <Link to="/torneios" className="btn btn-secondary mb-4">
        Voltar
      </Link>
      <h1 className="text-center mb-4">Pontuação do Torneio</h1>
      <table className="table table-bordered table-striped w-75 text-center">
        <thead className="thead-dark">
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
