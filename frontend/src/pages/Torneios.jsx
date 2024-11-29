import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Torneios = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [modalidadeId, setModalidadeId] = useState("");
  const [tipoTorneio, setTipoTorneio] = useState("todos");
  const [modalidades, setModalidades] = useState([]);
  const [torneios, setTorneios] = useState([]);
  const [torneiosFiltrados, setTorneiosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Buscar Modalidades
  useEffect(() => {
    axios
      .get("http://localhost:3333/modalidades")
      .then((response) => setModalidades(response.data))
      .catch((error) => setError("Erro ao buscar modalidades."));
  }, []);

  // Buscar Torneios
  useEffect(() => {
    axios
      .get("http://localhost:3333/torneios")
      .then((response) => {
        setTorneios(response.data);
        setTorneiosFiltrados(response.data);
      })
      .catch((error) => setError("Erro ao buscar torneios."));
  }, []);

  // Filtrar Torneios pelo Tipo
  useEffect(() => {
    setTorneiosFiltrados(
      tipoTorneio === "todos"
        ? torneios
        : torneios.filter((torneio) => torneio.tipo_torneio === tipoTorneio)
    );
  }, [tipoTorneio, torneios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nome, modalidade_id: modalidadeId, tipo_torneio: tipoTorneio };

    try {
      await axios.post("http://localhost:3333/torneios", data);
      alert("Torneio criado com sucesso!");
      setNome("");
      setModalidadeId("");
      setTipoTorneio("todos");

      const response = await axios.get("http://localhost:3333/torneios");
      setTorneios(response.data);
      setTorneiosFiltrados(response.data);
    } catch {
      alert("Erro ao criar torneio.");
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3">
        <a href="/" className="text-white text-decoration-none">Voltar</a>
      </button>
      <h1 className="mb-4">Criar Torneio</h1>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Torneio:</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modalidade" className="form-label">Modalidade:</label>
          <select
            id="modalidade"
            className="form-select"
            value={modalidadeId}
            onChange={(e) => setModalidadeId(e.target.value)}
            required
          >
            <option value="">Selecione uma modalidade</option>
            {modalidades.map((modalidade) => (
              <option key={modalidade.id} value={modalidade.id}>
                {modalidade.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tipoTorneio" className="form-label">Tipo de Torneio:</label>
          <select
            id="tipoTorneio"
            className="form-select"
            value={tipoTorneio}
            onChange={(e) => setTipoTorneio(e.target.value)}
            required
          >
            <option value="pontos corridos">Pontos Corridos</option>
            <option value="eliminatório">Eliminatório</option>
            <option value="todos">Todos</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Torneio
        </button>
      </form>

      <h2>Torneios</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Modalidade</th>
              <th>Tipo</th>
              <th>Em Andamento</th>
            </tr>
          </thead>
          <tbody>
            {torneiosFiltrados.map((torneio) => {
              const modalidade = modalidades.find(
                (mod) => mod.id === torneio.modalidade_id
              );

              return (
                <tr key={torneio.id}>
                  <td>{torneio.id}</td>
                  <td
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/torneios/${torneio.tipo_torneio.replace(" ", "-")}/${torneio.id}`
                      )
                    }
                  >
                    {torneio.nome}
                  </td>
                  <td>{modalidade ? modalidade.nome : "N/A"}</td>
                  <td>{torneio.tipo_torneio}</td>
                  <td>{torneio.em_andamento ? "Sim" : "Não"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Torneios;
