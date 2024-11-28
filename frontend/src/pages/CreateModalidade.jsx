import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateModalidade = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('equipe');
  const [modalidades, setModalidades] = useState([]); // Para armazenar as modalidades

  // Buscar todas as modalidades
  useEffect(() => {
    axios.get('http://localhost:3333/modalidades')  // Chama a API para pegar todas as modalidades
      .then(response => {
        setModalidades(response.data);  // Preenche o estado com os dados das modalidades
      })
      .catch(error => {
        console.error('Erro ao buscar modalidades:', error);
      });
  }, []);

  // Enviar os dados para o backend para criar a modalidade
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(tipo)

    const modalidadeData = {
      nome,
      tipo,
    };

    try {
      const response = await axios.post('http://localhost:3333/modalidades', modalidadeData);
      alert('Modalidade criada com sucesso!');
      console.log(response.data);

      // Recarregar a lista de modalidades após a criação
      axios.get('http://localhost:3333/modalidades')
        .then(response => {
          setModalidades(response.data);  // Atualiza a lista de modalidades
        })
        .catch(error => {
          console.error('Erro ao buscar modalidades:', error);
        });

      // Limpa os campos após o envio
      setNome('');
      setTipo('equipe');
    } catch (error) {
      console.error('Erro ao criar modalidade', error);
      alert('Erro ao criar modalidade');
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

      <h2>Modalidades Criadas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {modalidades.map(modalidade => (
            <tr key={modalidade.id}>
              <td>{modalidade.id}</td>
              <td>{modalidade.nome}</td>
              <td>{modalidade.tipo_modalidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateModalidade;
