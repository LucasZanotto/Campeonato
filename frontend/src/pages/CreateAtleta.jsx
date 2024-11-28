import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAtleta = () => {
  const [nome, setNome] = useState('');
  const [timeId, setTimeId] = useState('');
  const [times, setTimes] = useState([]); // Para armazenar os times
  const [atletas, setAtletas] = useState([]); // Para armazenar os atletas

  // Buscar todos os times
  useEffect(() => {
    axios.get('http://localhost:3333/times')  // Chama a API para pegar todos os times
      .then(response => {
        setTimes(response.data);  // Preenche o estado com os dados dos times
      })
      .catch(error => {
        console.error('Erro ao buscar times:', error);
      });

    // Buscar todos os atletas ao montar o componente
    axios.get('http://localhost:3333/atletas')
      .then(response => {
        setAtletas(response.data);  // Preenche o estado com os dados dos atletas
      })
      .catch(error => {
        console.error('Erro ao buscar atletas:', error);
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
        setNome('');  // Limpa o campo nome após a criação
        setTimeId('');  // Limpa o campo time selecionado
        // Recarregar a lista de atletas após a criação
        axios.get('http://localhost:3333/atletas')
          .then(response => {
            setAtletas(response.data);  // Atualiza a lista de atletas
          })
          .catch(error => {
            console.error('Erro ao buscar atletas:', error);
          });
      })
      .catch(error => {
        alert('Erro ao criar atleta');
        console.error(error);
      });
  };

  // Função para buscar o nome do time pelo id
  const getTimeNameById = (id) => {
    const time = times.find((time) => time.id === id);
    return time ? time.nome : 'Sem time';
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

      <h2>Atletas Criados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {atletas.map(atleta => (
            <tr key={atleta.id}>
              <td>{atleta.id}</td>
              <td>{atleta.nome}</td>
              <td>{getTimeNameById(atleta.time_id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateAtleta;
