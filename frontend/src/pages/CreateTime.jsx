import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTime = () => {
  const [nome, setNome] = useState('');
  const [times, setTimes] = useState([]);

  // Função para buscar os times do servidor
  const fetchTimes = async () => {
    try {
      const response = await axios.get('http://localhost:3333/times');
      setTimes(response.data);
    } catch (error) {
      console.error('Erro ao buscar times:', error);
      alert('Erro ao carregar times');
    }
  };

  // Carregar os times quando o componente for montado
  useEffect(() => {
    fetchTimes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/times', { nome });
      alert('Time criado com sucesso!');
      setNome('');  // Limpar o campo de nome após a criação
      fetchTimes(); // Recarregar os times após a criação
    } catch (error) {
      console.error(error);
      alert('Erro ao criar time');
    }
  };

  return (
    <div>
      <h2>Criar Time</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Time:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <button type="submit">Criar Time</button>
      </form>

      <h3>Times Criados</h3>
      <table>
        <thead>
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
  );
};

export default CreateTime;
