import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardTorneio from '../components/CardTorneio';

const Torneios = () => {
  const [torneios, setTorneios] = useState([]);

  useEffect(() => {
    const fetchTorneios = async () => {
      try {
        const response = await axios.get('http://localhost:3333/torneios');
        setTorneios(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTorneios();
  }, []);

  return (
    <div>
      <h2>Torneios</h2>
      <div>
        {torneios.map((torneio) => (
          <CardTorneio key={torneio.id} torneio={torneio} />
        ))}
      </div>
    </div>
  );
};

export default Torneios;
