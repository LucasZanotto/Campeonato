import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Grupos = () => {
  const { id } = useParams();
  const [modalidade, setModalidade] = useState(null);
  const [entidades, setEntidades] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [grupos, setGrupos] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
  });
  const [oponente1Id, setOponente1Id] = useState("");
  const [oponente2Id, setOponente2Id] = useState("");
  const [partidas, setPartidas] = useState([]);
  const [editandoPontos, setEditandoPontos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const torneioResponse = await axios.get(
          `http://localhost:3333/torneios/${id}`
        );
        const modalidadesResponse = await axios.get(
          "http://localhost:3333/modalidades"
        );
        const modalidadeSelecionada = modalidadesResponse.data.find(
          (mod) => mod.id === torneioResponse.data.modalidade_id
        );
        setModalidade(modalidadeSelecionada);

        if (modalidadeSelecionada.tipo_modalidade === "equipe") {
          const timesResponse = await axios.get("http://localhost:3333/times");
          setEntidades(timesResponse.data);
        } else if (modalidadeSelecionada.tipo_modalidade === "individual") {
          const atletasResponse = await axios.get(
            "http://localhost:3333/atletas"
          );
          setEntidades(atletasResponse.data);
        }

        const partidasResponse =
          modalidadeSelecionada.tipo_modalidade === "equipe"
            ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
            : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
        setPartidas(partidasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    async function fetchGrupos() {
      try {
        const response = await axios.get(
          "http://localhost:3333/torneios/1/grupos/pegar"
        );
        const dados = response.data;

        const gruposFormatados = dados.reduce((acc, grupo) => {
          if (!acc[grupo.nome]) {
            acc[grupo.nome] = [];
          }
          acc[grupo.nome].push({
            id: grupo.id,
            nome: grupo.time_nome,
          });
          return acc;
        }, {});

        setGrupos(gruposFormatados);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    }

    fetchGrupos();

    fetchData();
  }, [id]);

  const handleSavePontos = async (partidaId, oponente1Pontos, oponente2Pontos) => {
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

      const response = await axios.put(
        `http://localhost:3333/partidas/${partidaId}/encerrar`
      );
      alert("Partida encerrada com sucesso!");

      const atualizadas =
        modalidade.tipo_modalidade === "equipe"
          ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
          : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
      setPartidas(atualizadas.data);
    } catch (error) {
      console.error("Erro ao encerrar a partida:", error.response || error);
      alert(
        "Erro ao encerrar a partida: " +
          (error.response?.data?.message || "Erro desconhecido")
      );
    }
  };

  const handleAdicionar = (event) => {
    const entidadeId = event.target.value;
    const entidade = entidades.find((e) => e.id === parseInt(entidadeId, 10));

    if (!entidade || selecionados.some((s) => s.id === entidade.id)) {
      return;
    }

    const novosSelecionados = [...selecionados, entidade];
    setSelecionados(novosSelecionados);
    localStorage.setItem(
      `selecionados-grupos-${id}`,
      JSON.stringify(novosSelecionados)
    );
  };

  const handleRemover = (entidadeId) => {
    const atualizados = selecionados.filter((s) => s.id !== entidadeId);
    setSelecionados(atualizados);
    localStorage.setItem(
      `selecionados-grupos-${id}`,
      JSON.stringify(atualizados)
    );
  };

  const handleEmparelhar = async () => {
    if (selecionados.length === 0) {
      alert("Nenhum participante disponível para emparelhar.");
      return;
    }

    const shuffled = [...selecionados].sort(() => Math.random() - 0.5);
    const gruposTemp = { A: [], B: [], C: [], D: [] };
    shuffled.forEach((participante, index) => {
      const grupo = ["A", "B", "C", "D"][index % 4];
      gruposTemp[grupo].push({ ...participante });
    });
    setGrupos(gruposTemp);

    try {
      const response = await axios.post(
        `http://localhost:3333/torneios/${id}/grupos`,
        {
          grupos: gruposTemp,
        }
      );
      alert("Grupos emparelhados e salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar os grupos:", error);
      alert("Erro ao salvar os grupos no servidor.");
    }
  };

  const handleCriarPartida = async (event) => {
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
      const partidasResponse =
        modalidade.tipo_modalidade === "equipe"
          ? await axios.get(`http://localhost:3333/time/${id}/partidas`)
          : await axios.get(`http://localhost:3333/atleta/${id}/partidas`);
      setPartidas(partidasResponse.data);
    } catch (error) {
      console.error("Erro ao criar a partida:", error);
      alert("Erro ao criar a partida.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Chave de Grupos</h1>
      <div className="mb-3">
        <Link to={`/torneios/${id}/pontuacao`}>
          <button className="btn btn-primary">Ver Pontuação</button>
        </Link>
      </div>
      <button className="btn btn-secondary" onClick={handleEmparelhar}>
        Emparelhar
      </button>
      {modalidade ? (
        <p className="mt-3">
          Modalidade: {modalidade.nome} ({modalidade.tipo_modalidade})
        </p>
      ) : (
        <p>Carregando modalidade...</p>
      )}

      <div className="mt-4 mb-4">
        <label htmlFor="participante-select">Adicionar Participante:</label>
        <select
          id="participante-select"
          className="form-control"
          onChange={handleAdicionar}
          value=""
        >
          <option value="" disabled>
            Selecione um participante
          </option>
          {entidades.map((entidade) => (
            <option key={entidade.id} value={entidade.id}>
              {entidade.nome}
            </option>
          ))}
        </select>
      </div>

      <h2 className="mt-4">Participantes Selecionados</h2>
      {selecionados.length > 0 ? (
        <ul className="list-group">
          {selecionados.map((entidade) => (
            <li key={entidade.id} className="list-group-item d-flex justify-content-between align-items-center">
              {entidade.nome}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemover(entidade.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum participante adicionado.</p>
      )}

      <h2 className="mt-5">Grupos</h2>
      <div className="row">
        {Object.entries(grupos).map(([grupo, participantes]) => (
          <div key={grupo} className="col-md-3 mb-4">
            <h3>Grupo {grupo}</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                {participantes.map((participante) => (
                  <tr key={participante.id}>
                    <td>{participante.id}</td>
                    <td>{participante.nome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Criar Partida</h2>
      <form onSubmit={handleCriarPartida}>
        <div className="form-group">
          <label htmlFor="oponente1">Oponente 1:</label>
          <select
            id="oponente1"
            className="form-control"
            value={oponente1Id}
            onChange={(e) => setOponente1Id(e.target.value)}
            required
          >
            <option value="">Selecione o Oponente 1</option>
            {selecionados.map((entidade) => (
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
            className="form-control"
            value={oponente2Id}
            onChange={(e) => setOponente2Id(e.target.value)}
            required
          >
            <option value="">Selecione o Oponente 2</option>
            {selecionados.map((entidade) => (
              <option key={entidade.id} value={entidade.id}>
                {entidade.nome}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success mt-3" type="submit">
          Criar Partida
        </button>
      </form>

      <h2 className="mt-5">Partidas do Torneio</h2>
      <table className="table table-striped table-bordered">
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
              <td>
                {editandoPontos === partida.id ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleSavePontos(
                        partida.id,
                        partida.oponente1_pontos,
                        partida.oponente2_pontos
                      )
                    }
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditandoPontos(partida.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEncerrarPartida(partida.id)}
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

export default Grupos;
