import React, { useState } from 'react';
import axios from 'axios';

const CreateModalidade = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('equipe');

  // Enviar os dados para o backend para criar a modalidade
  const handleSubmit = async (event) => {
    event.preventDefault();

    const modalidadeData = {
      nome,
      tipo,
    };

    try {
      const response = await axios.post('http://localhost:3333/modalidades', modalidadeData);
      alert('Modalidade criada com sucesso!');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao criar modalidade', error);
    }
  };

  return (
    <div>
      <h2>Criar Modalidade</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome da Modalidade</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipo de Modalidade</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="equipe">Equipe</option>
            <option value="individual">Individual</option>
          </select>
        </div>

        <div>
          <button type="submit">Criar Modalidade</button>
        </div>
      </form>
    </div>
  );
};

export default CreateModalidade;
