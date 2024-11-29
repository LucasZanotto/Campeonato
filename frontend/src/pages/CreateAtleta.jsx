import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateAtleta = () => {
  const [nome, setNome] = useState("");
  const [timeId, setTimeId] = useState("");
  const [times, setTimes] = useState([]);
  const [atletas, setAtletas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/times")
      .then((response) => {
        setTimes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar times:", error);
      });
    axios
      .get("http://localhost:3333/atletas")
      .then((response) => {
        setAtletas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar atletas:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nome,
      time_id: timeId,
    };

    axios
      .post("http://localhost:3333/atletas", data)
      .then(() => {
        alert("Atleta criado com sucesso!");
        setNome("");
        setTimeId("");
        axios
          .get("http://localhost:3333/atletas")
          .then((response) => {
            setAtletas(response.data);
          })
          .catch((error) => {
            console.error("Erro ao buscar atletas:", error);
          });
      })
      .catch((error) => {
        alert("Erro ao criar atleta");
        console.error(error);
      });
  };

  const getTimeNameById = (id) => {
    const time = times.find((time) => time.id === id);
    return time ? time.nome : "Sem time";
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Botão de Voltar */}
      <div className="mb-4">
        <a href="/" className="btn btn-secondary">Voltar</a>
      </div>

      {/* Formulário para criar atleta */}
      <div className="card p-4 w-100" style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Criar Atleta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome do Atleta:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="form-control"
              placeholder="Digite o nome do atleta"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Escolha o Time:</label>
            <select
              id="time"
              value={timeId}
              onChange={(e) => setTimeId(e.target.value)}
              className="form-select"
            >
              <option value="">Selecione um time</option>
              {times.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Criar Atleta</button>
        </form>
      </div>

      {/* Tabela de atletas criados */}
      <div className="mt-5 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Atletas Criados</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {atletas.map((atleta) => (
              <tr key={atleta.id}>
                <td>{atleta.id}</td>
                <td>{atleta.nome}</td>
                <td>{getTimeNameById(atleta.time_id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAtleta;
