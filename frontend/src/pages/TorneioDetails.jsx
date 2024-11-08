import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TorneioDetails = () => {
  const { id } = useParams(); // Pega o parâmetro id da URL
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competidores, setCompetidores] = useState([]); // Para os competidores
  const [formData, setFormData] = useState({
    competidor1_id: '',
    competidor2_id: '',
    fase: '',
    resultado: '',
  });

  useEffect(() => {
    // Pega as partidas do torneio
    axios.get(`http://localhost:3333/torneios/${id}/partidas`)
      .then(response => {
        setPartidas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as partidas:', error);
        setLoading(false);
      });

    // Pega todos os competidores do torneio (ou times/atletas, dependendo do que você usa)
    axios.get(`http://localhost:3333/torneios/${id}/competidores`) // Ajuste a URL conforme a sua API
      .then(response => {
        setCompetidores(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar competidores:', error);
      });
  }, [id]);  // Dependência do id para sempre buscar os dados corretos

  // Função para criar uma nova partida
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3333/partidas`, {
      torneio_id: id,
      competidor1_id: formData.competidor1_id,
      competidor2_id: formData.competidor2_id,
      fase: formData.fase,
      resultado: formData.resultado,
      em_andamento: 1, // Adicione de acordo com seu caso (por exemplo, "1" para em andamento)
    })
      .then(response => {
        alert('Partida criada com sucesso!');
        setPartidas([...partidas, response.data]);  // Atualiza a lista de partidas com a nova partida
        setFormData({
          competidor1_id: '',
          competidor2_id: '',
          fase: '',
          resultado: '',
        });
      })
      .catch(error => {
        console.error('Erro ao criar partida:', error);
        alert('Erro ao criar partida');
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (partidas.length === 0) {
    return <div>Nenhuma partida encontrada para este torneio.</div>;
  }

  return (
    <div>
      <h1>Partidas do Torneio</h1>
      <ul>
        {partidas.map((partida) => (
          <li key={partida.id}>
            <h3>Partida {partida.id}</h3>
            <p>Competidor 1: {competidores.find(c => c.id === partida.competidor1_id)?.nome}</p>
            <p>Competidor 2: {competidores.find(c => c.id === partida.competidor2_id)?.nome}</p>
            <p>Fase: {partida.fase}</p>
            <p>Resultado: {partida.resultado}</p>
            <p>Status: {partida.em_andamento === '1' ? 'Em andamento' : 'Finalizada'}</p>
          </li>
        ))}
      </ul>

      <h2>Criar Nova Partida</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Competidor 1</label>
          <select
            name="competidor1_id"
            value={formData.competidor1_id}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {competidores.map((competidor) => (
              <option key={competidor.id} value={competidor.id}>
                {competidor.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Competidor 2</label>
          <select
            name="competidor2_id"
            value={formData.competidor2_id}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {competidores.map((competidor) => (
              <option key={competidor.id} value={competidor.id}>
                {competidor.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fase</label>
          <input
            type="text"
            name="fase"
            value={formData.fase}
            onChange={handleChange}
            placeholder="Ex: Oitavas, Quartas, Final"
          />
        </div>

        <div>
          <label>Resultado</label>
          <select
            name="resultado"
            value={formData.resultado}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="vitoria">Vitória</option>
            <option value="derrota">Derrota</option>
            <option value="empate">Empate</option>
          </select>
        </div>

        <button type="submit">Criar Partida</button>
      </form>
    </div>
  );
};

export default TorneioDetails;
