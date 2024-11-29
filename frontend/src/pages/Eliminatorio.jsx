import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const EliminatorioDetalhes = () => {
  const { id } = useParams();
  const [torneio, setTorneio] = useState(null);
  const [modalidade, setModalidade] = useState(null);
  const [entidades, setEntidades] = useState([]);
  const [oponente1Id, setOponente1Id] = useState("");
  const [oponente2Id, setOponente2Id] = useState("");
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoPontos, setEditandoPontos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const torneioResponse = await axios.get(
          `http://localhost:3333/torneios/${id}`
        );
        setTorneio(torneioResponse.data);

        const modalidadesResponse = await axios.get(
          "http://localhost:3333/modalidades"
        );
        const modalidadeSelecionada = modalidadesResponse.data.find(
          (mod) => mod.id === torneioResponse.data.modalidade_id
        );
        setModalidade(modalidadeSelecionada);

        let entidadesResponse;
        if (modalidadeSelecionada.tipo_modalidade === "equipe") {
          entidadesResponse = await axios.get("http://localhost:3333/times");
        } else if (modalidadeSelecionada.tipo_modalidade === "individual") {
          entidadesResponse = await axios.get("http://localhost:3333/atletas");
        }

        if (entidadesResponse) {
          setEntidades(entidadesResponse.data);
        }

        const partidasResponse =
          modalidadeSelecionada.tipo_modalidade === "equipe"
            ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
            : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
        setPartidas(partidasResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <Link to="/torneios" className="btn btn-secondary mb-4">
        Voltar
      </Link>
      {torneio ? (
        <h1 className="text-center mb-4">{torneio.nome}</h1>
      ) : (
        <p>Carregando torneio...</p>
      )}

      <div className="d-flex justify-content-center gap-3 mb-4">
        <Link to={`/torneios/${id}/pontuacao`} className="btn btn-primary">
          Ver Pontuação
        </Link>
        <Link to={`/torneios/eliminatorio/${id}/grupos`} className="btn btn-primary">
          Chave de Grupos
        </Link>
      </div>

      <h2 className="text-center mb-4">Partidas do Torneio</h2>
      <table className="table table-bordered table-striped w-75 text-center">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Oponente 1</th>
            <th>Oponente 2</th>
            <th>Pontos Oponente 1</th>
            <th>Pontos Oponente 2</th>
            <th>Em Andamento</th>
          </tr>
        </thead>
        <tbody>
          {partidas.map((partida) => (
            <tr key={partida.id}>
              <td>{partida.id}</td>
              <td>{partida.oponente1_nome}</td>
              <td>{partida.oponente2_nome}</td>
              <td>
                {editandoPontos === partida.id ? (
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={partida.oponente1_pontos}
                    onChange={(e) =>
                      (partida.oponente1_pontos = e.target.value)
                    }
                  />
                ) : (
                  partida.oponente1_pontos
                )}
              </td>
              <td>
                {editandoPontos === partida.id ? (
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={partida.oponente2_pontos}
                    onChange={(e) =>
                      (partida.oponente2_pontos = e.target.value)
                    }
                  />
                ) : (
                  partida.oponente2_pontos
                )}
              </td>
              <td>{partida.em_andamento ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EliminatorioDetalhes;
