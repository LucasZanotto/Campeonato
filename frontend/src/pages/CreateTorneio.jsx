import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTorneio = () => {
  const [nome, setNome] = useState('');
  const [modalidadeId, setModalidadeId] = useState('');
  const [modalidades, setModalidades] = useState([]);
  const [competidorTipo, setCompetidorTipo] = useState('');
  const [competidorId, setCompetidorId] = useState('');
  const [tipo, setTipo] = useState('pontos_corridos');

  // Buscar todas as modalidades quando o componente for carregado
  useEffect(() => {
    const fetchModalidades = async () => {
      try {
        const response = await axios.get('http://localhost:3333/modalidades');
        setModalidades(response.data);
      } catch (error) {
        console.error('Erro ao buscar modalidades', error);
      }
    };

    fetchModalidades();
  }, []);

  // Atualizar o tipo de competidor quando a modalidade for escolhida
  const handleModalidadeChange = (event) => {
    const selectedModalidadeId = event.target.value;
    setModalidadeId(selectedModalidadeId);

    const modalidadeSelecionada = modalidades.find(
      (modalidade) => modalidade.id === parseInt(selectedModalidadeId)
    );

    // Atualizar o tipo de competidor conforme a modalidade
    setCompetidorTipo(modalidadeSelecionada ? modalidadeSelecionada.tipo : '');
  };

  // Enviar os dados para o backend para criar o torneio
  const handleSubmit = async (event) => {
    event.preventDefault();

    const torneioData = {
      nome,
      modalidade_id: modalidadeId,
      tipo,
      competidor_id: competidorId,
      em_andamento: 1, // Você pode ajustar conforme o seu modelo de dados
    };

    try {
      const response = await axios.post('http://localhost:3333/torneios', torneioData);
      alert('Torneio criado com sucesso!');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao criar torneio', error);
    }
  };

  return (
    <div>
      <h2>Criar Torneio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Torneio</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="modalidade">Modalidade</label>
          <select
            id="modalidade"
            value={modalidadeId}
            onChange={handleModalidadeChange}
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

        <div>
          <label htmlFor="competidor">Tipo de Competidor</label>
          <input
            type="text"
            id="competidor"
            value={competidorTipo}
            onChange={(e) => setCompetidorTipo(e.target.value)}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="competidorId">ID do Competidor</label>
          <input
            type="number"
            id="competidorId"
            value={competidorId}
            onChange={(e) => setCompetidorId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipo de Torneio</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="pontos_corridos">Pontos Corridos</option>
            <option value="classificatorios">Classificatórias</option>
          </select>
        </div>

        <div>
          <button type="submit">Criar Torneio</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTorneio;
