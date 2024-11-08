import React, { useState } from 'react';
import axios from 'axios';

const CreateTime = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/times', { nome });
      alert('Time criado com sucesso!');
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
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>
        <button type="submit">Criar Time</button>
      </form>
    </div>
  );
};

export default CreateTime;
