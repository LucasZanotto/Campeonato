import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateTime from "./pages/CreateTime";
import CreateAtleta from "./pages/CreateAtleta";
import Torneios from "./pages/Torneios";
import CreateModalidade from "./pages/CreateModalidade";
import PontosCorridos from "./pages/PontosCorridos";
import Eliminatorio from "./pages/Eliminatorio";
import TorneioDetalhes from "./pages/TorneioDetalhes";
import Pontuacao from "./pages/Pontuacao";
import Grupos from "./pages/Grupos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-time" element={<CreateTime />} />
        <Route path="/create-atleta" element={<CreateAtleta />} />
        <Route path="/create-modalidade" element={<CreateModalidade />} />
        <Route path="/torneios" element={<Torneios />} />
        <Route path="/torneios/pontos-corridos/:id" element={<TorneioDetalhes />} />
        <Route path="/torneios/eliminatório/:id" element={<Eliminatorio />} />
        <Route path="/torneios/pontos-corridos" element={<PontosCorridos />} />
        <Route path="/torneios/:id/pontuacao" element={<Pontuacao />} />
        <Route path="/torneios/eliminatorio/:id/grupos" element={<Grupos />} />
      </Routes>
    </Router>
  );
};

export default App;
