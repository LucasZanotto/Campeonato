import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTime = () => {
  const [nome, setNome] = useState("");
  const [times, setTimes] = useState([]);

  const fetchTimes = async () => {
    try {
      const response = await axios.get("http://localhost:3333/times");
      setTimes(response.data);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
      alert("Erro ao carregar times");
    }
  };

  useEffect(() => {
    fetchTimes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3333/times", { nome });
      alert("Time criado com sucesso!");
      setNome("");
      fetchTimes();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar time");
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Botão de Voltar */}
      <div className="mb-4">
        <a href="/" className="btn btn-secondary">Voltar</a>
      </div>

      {/* Formulário para criar time */}
      <div className="card p-4 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Criar Time</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome do Time:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="form-control"
              placeholder="Digite o nome do time"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Criar Time</button>
        </form>
      </div>

      {/* Tabela de times criados */}
      <div className="mt-5 w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Times Criados</h3>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time.id}>
                <td>{time.id}</td>
                <td>{time.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateTime;
