import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Torneios = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [modalidadeId, setModalidadeId] = useState('');
  const [tipoTorneio, setTipoTorneio] = useState('todos'); // Tipo selecionado para exibição
  const [modalidades, setModalidades] = useState([]);
  const [torneios, setTorneios] = useState([]);
  const [torneiosFiltrados, setTorneiosFiltrados] = useState([]); // Para exibição dinâmica

  // Buscar modalidades para o formulário
  useEffect(() => {
    axios.get('http://localhost:3333/modalidades')
      .then(response => {
        setModalidades(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar modalidades:', error);
      });
  }, []);

  // Buscar todos os torneios
  useEffect(() => {
    axios.get('http://localhost:3333/torneios')
      .then(response => {
        setTorneios(response.data);
        setTorneiosFiltrados(response.data); // Exibe todos inicialmente
      })
      .catch(error => {
        console.error('Erro ao buscar torneios:', error);
      });
  }, []);

  // Atualizar exibição com base no tipo selecionado
  useEffect(() => {
    if (tipoTorneio === 'todos') {
      setTorneiosFiltrados(torneios); // Mostra todos os torneios
    } else {
      setTorneiosFiltrados(torneios.filter(torneio => torneio.tipo_torneio === tipoTorneio));
    }
  }, [tipoTorneio, torneios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      modalidade_id: modalidadeId,
      tipo_torneio: tipoTorneio, // Tipo de torneio selecionado no formulário
    };

    try {
      await axios.post('http://localhost:3333/torneios', data);
      alert('Torneio criado com sucesso!');
      setNome('');
      setModalidadeId('');
      setTipoTorneio('todos'); // Reseta para mostrar todos

      // Atualiza a lista de torneios
      const response = await axios.get('http://localhost:3333/torneios');
      setTorneios(response.data);
      setTorneiosFiltrados(response.data);
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      alert('Erro ao criar torneio');
    }
  };

  return (
    <div>
      <h1>Criar Torneio</h1>
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
        <div>
          <label htmlFor="tipoTorneio">Tipo de Torneio:</label>
          <select
            id="tipoTorneio"
            value={tipoTorneio}
            onChange={(e) => setTipoTorneio(e.target.value)}
            required
          >
            <option value="pontos corridos">Pontos Corridos</option>
            <option value="eliminatório">Eliminatório</option>
            <option value="todos">Todos</option>
          </select>
        </div>
        <button type="submit">Criar Torneio</button>
      </form>

      <h2>Torneios</h2>
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Modalidade</th>
            <th>Tipo</th>
            <th>Em Andamento</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
  {torneiosFiltrados.map((torneio) => {
    // Encontra a modalidade correspondente ao modalidade_id do torneio
    const modalidade = modalidades.find((mod) => mod.id === torneio.modalidade_id);

    return (
      <tr key={torneio.id}>
        <td>{torneio.id}</td>
        <td onClick={() => navigate(`/torneios/${torneio.tipo_torneio.replace(' ', '-')}/${torneio.id}`)}>
          {torneio.nome}
        </td>
        <td>{modalidade ? modalidade.nome : 'N/A'}</td>
        <td>{torneio.tipo_torneio}</td>
        <td>{torneio.em_andamento ? 'Sim' : 'Não'}</td>
        <td>{torneio.created_at || 'N/A'}</td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

export default Torneios;