import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const TorneioDetalhes = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const partida = {
      torneio_id: id,
      oponente1_id: oponente1Id,
      oponente2_id: oponente2Id,
    };

    try {
      await axios.post("http://localhost:3333/partidas", partida);
      alert("Partida criada com sucesso!");
      setOponente1Id("");
      setOponente2Id("");
      const atualizadas =
        modalidade.tipo_modalidade === "equipe"
          ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
          : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
      setPartidas(atualizadas.data);
    } catch (error) {
      console.error("Erro ao criar a partida:", error);
      alert("Erro ao criar a partida.");
    }
  };

  const handleSavePontos = async (
    partidaId,
    oponente1Pontos,
    oponente2Pontos
  ) => {
    try {
      await axios.put(`http://localhost:3333/partidas/${partidaId}/pontos`, {
        oponente1_pontos: oponente1Pontos,
        oponente2_pontos: oponente2Pontos,
      });
      alert("Pontos atualizados com sucesso!");
      setEditandoPontos(null);
      const atualizadas =
        modalidade.tipo_modalidade === "equipe"
          ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
          : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
      setPartidas(atualizadas.data);
    } catch (error) {
      console.error("Erro ao atualizar os pontos:", error);
      alert("Erro ao atualizar os pontos.");
    }
  };

  const handleEncerrarPartida = async (partidaId) => {
    try {
      const confirmacao = window.confirm(
        "Tem certeza que deseja encerrar esta partida?"
      );
      if (!confirmacao) return;

      await axios.put(`http://localhost:3333/partidas/${partidaId}/encerrar`);
      alert("Partida encerrada com sucesso!");

      const atualizadas =
        modalidade.tipo_modalidade === "equipe"
          ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
          : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
      setPartidas(atualizadas.data);
    } catch (error) {
      console.error("Erro ao encerrar a partida:", error);
      alert("Erro ao encerrar a partida.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container my-5">
      <Link to="/torneios" className="btn btn-secondary mb-3">
        Voltar
      </Link>
      {torneio ? <h1>{torneio.nome}</h1> : <p>Carregando torneio...</p>}

      <Link to={`/torneios/${id}/pontuacao`} className="btn btn-info my-3">
        Ver Pontuação
      </Link>

      <form onSubmit={handleSubmit} className="mb-4">
        <h2>Criar Partida</h2>
        <div className="form-group">
          <label htmlFor="oponente1">Oponente 1:</label>
          <select
            id="oponente1"
            value={oponente1Id}
            onChange={(e) => setOponente1Id(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Selecione o Oponente 1</option>
            {entidades.map((entidade) => (
              <option key={entidade.id} value={entidade.id}>
                {entidade.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="oponente2">Oponente 2:</label>
          <select
            id="oponente2"
            value={oponente2Id}
            onChange={(e) => setOponente2Id(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Selecione o Oponente 2</option>
            {entidades.map((entidade) => (
              <option key={entidade.id} value={entidade.id}>
                {entidade.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Criar Partida
        </button>
      </form>

      <h2>Partidas do Torneio</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Oponente 1</th>
            <th>Oponente 2</th>
            <th>Pontos Oponente 1</th>
            <th>Pontos Oponente 2</th>
            <th>Em Andamento</th>
            <th>Ações</th>
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
                    defaultValue={partida.oponente1_pontos}
                    onChange={(e) =>
                      (partida.oponente1_pontos = e.target.value)
                    }
                    className="form-control"
                  />
                ) : (
                  partida.oponente1_pontos
                )}
              </td>
              <td>
                {editandoPontos === partida.id ? (
                  <input
                    type="number"
                    defaultValue={partida.oponente2_pontos}
                    onChange={(e) =>
                      (partida.oponente2_pontos = e.target.value)
                    }
                    className="form-control"
                  />
                ) : (
                  partida.oponente2_pontos
                )}
              </td>
              <td>{partida.em_andamento ? "Sim" : "Não"}</td>
              <td>
                {editandoPontos === partida.id ? (
                  <button
                    onClick={() =>
                      handleSavePontos(
                        partida.id,
                        partida.oponente1_pontos,
                        partida.oponente2_pontos
                      )
                    }
                    className="btn btn-success"
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditandoPontos(partida.id)}
                      className="btn btn-warning"
                    >
                      Editar Pontos
                    </button>
                    <button
                      onClick={() => handleEncerrarPartida(partida.id)}
                      className="btn btn-danger ml-2"
                    >
                      Encerrar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TorneioDetalhes;
