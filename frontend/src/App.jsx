import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTime from './pages/CreateTime';
import CreateAtleta from './pages/CreateAtleta';
import CreateTorneio from './pages/CreateTorneio';
import Torneios from './pages/Torneios';
import TorneioDetails from './pages/TorneioDetails';
import CreateModalidade from './pages/CreateModalidade';
import TorneioPartidas from './pages/TorneioPartidas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-time" element={<CreateTime />} />
        <Route path="/create-atleta" element={<CreateAtleta />} />
        <Route path="/create-modalidade" element={<CreateModalidade />} />
        <Route path="/create-torneio" element={<CreateTorneio />} />
        <Route path="/torneios" element={<Torneios />} />
        <Route path="/torneio/:id" element={<TorneioDetails />} />
        <Route path="/torneios/:id/partidas" element={<TorneioPartidas />} />
      </Routes>
    </Router>
  );
};

export default App;
