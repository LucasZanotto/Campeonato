import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateModalidade = () => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("equipe");
  const [modalidades, setModalidades] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/modalidades")
      .then((response) => {
        setModalidades(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar modalidades:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const modalidadeData = {
      nome,
      tipo,
    };

    try {
      await axios.post("http://localhost:3333/modalidades", modalidadeData);
      alert("Modalidade criada com sucesso!");

      axios
        .get("http://localhost:3333/modalidades")
        .then((response) => {
          setModalidades(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar modalidades:", error);
        });

      setNome("");
      setTipo("equipe");
    } catch (error) {
      console.error("Erro ao criar modalidade", error);
      alert("Erro ao criar modalidade");
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Botão de Voltar */}
      <div className="mb-4">
        <a href="/" className="btn btn-secondary">Voltar</a>
      </div>

      {/* Formulário de criação de modalidade */}
      <div className="card p-4 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Criar Modalidade</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome da Modalidade</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="form-control"
              placeholder="Digite o nome da modalidade"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">Tipo de Modalidade</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="form-select"
            >
              <option value="equipe">Equipe</option>
              <option value="individual">Individual</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Criar Modalidade</button>
        </form>
      </div>

      {/* Tabela de modalidades criadas */}
      <div className="mt-5 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Modalidades Criadas</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {modalidades.map((modalidade) => (
              <tr key={modalidade.id}>
                <td>{modalidade.id}</td>
                <td>{modalidade.nome}</td>
                <td>{modalidade.tipo_modalidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateModalidade;
