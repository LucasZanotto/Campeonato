import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAtleta = () => {
  const [nome, setNome] = useState('');
  const [timeId, setTimeId] = useState('');
  const [times, setTimes] = useState([]); // Para armazenar os times

  // Buscar todos os times
  useEffect(() => {
    axios.get('http://localhost:3333/times')  // Chama a API para pegar todos os times
      .then(response => {
        setTimes(response.data);  // Preenche o estado com os dados dos times
      })
      .catch(error => {
        console.error('Erro ao buscar times:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Monta o corpo da requisição
    const data = {
      nome,
      time_id: timeId  // Envia o ID do time selecionado
    };

    // Envia para a API para criar o atleta
    axios.post('http://localhost:3333/atletas', data)
      .then(response => {
        alert('Atleta criado com sucesso!');
      })
      .catch(error => {
        alert('Erro ao criar atleta');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Criar Atleta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Atleta:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Escolha o Time:</label>
          <select value={timeId} onChange={(e) => setTimeId(e.target.value)} required>
            <option value="">Selecione um time</option>
            {times.map(time => (
              <option key={time.id} value={time.id}>{time.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Criar Atleta</button>
      </form>
    </div>
  );
};

export default CreateAtleta;
