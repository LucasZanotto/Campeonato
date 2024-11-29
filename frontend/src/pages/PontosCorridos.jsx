import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PontosCorridos = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [modalidadeId, setModalidadeId] = useState('');
  const [modalidades, setModalidades] = useState([]);
  const [torneios, setTorneios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/modalidades')
      .then(response => {
        setModalidades(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar modalidades:', error);
      });
  }, []);

  useEffect(() => {
    axios.post('http://localhost:3333/torneios/tipo', { tipo: 'pontos corridos' })
      .then(response => {
        setTorneios(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar torneios de pontos corridos:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      modalidade_id: modalidadeId,
      tipo_torneio: 'pontos corridos',
    };

    try {
      await axios.post('http://localhost:3333/torneios', data);
      alert('Torneio criado com sucesso!');
      setNome('');
      setModalidadeId('');

      const response = await axios.post('http://localhost:3333/torneios/tipo', { tipo: 'pontos corridos' });
      setTorneios(response.data);
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      alert('Erro ao criar torneio');
    }
  };

  return (
    <div>
      <button><a href="/torneios">Voltar</a></button>
      <h1>Pontos Corridos</h1>

      <h2>Criar Torneio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Torneio:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="modalidade">Modalidade:</label>
          <select
            id="modalidade"
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
        <button type="submit">Criar Torneio</button>
      </form>

      <h2>Torneios de Pontos Corridos</h2>
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Modalidade</th>
            <th>Em Andamento</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          {torneios.map((torneio) => (
            <tr key={torneio.id}>
              <td>{torneio.id}</td>
              <td onClick={() => navigate(`/torneios/pontos-corridos/${torneio.id}`)}>{torneio.nome}</td>
              <td>{torneio.modalidade?.nome || 'N/A'}</td>
              <td>{torneio.em_andamento ? 'Sim' : 'Não'}</td>
              <td>{torneio.created_at || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PontosCorridos;
