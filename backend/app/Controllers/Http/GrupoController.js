const Grupo = use('App/Models/Grupo');
const Database = use('Database');

class GrupoController {
  async adicionarParticipantes({ request, response, params }) {
    const { grupos } = request.only(['grupos']); 
    const torneioId = params.torneio_id;

    try {
      const dadosGrupos = Object.entries(grupos).flatMap(([nome, participantes]) =>
        participantes.map((participante) => ({
          nome,
          torneio_id: torneioId,
          participante_id: participante.id,
          pontos: 0,
          em_andamento: true,
        }))
      );

      await Grupo.createMany(dadosGrupos);

      return response.status(201).json({ message: 'Grupos criados com sucesso!' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro ao criar os grupos.' });
    }
  }

  async listarPorTorneio({ params, response }) {
    const torneioId = params.torneio_id;
  
    try {
      const grupos = await Database.raw(`
        SELECT g.id, g.nome, g.pontos, g.em_andamento, t.nome AS time_nome
        FROM grupos g
        LEFT JOIN times t ON g.participante_id = t.id
        WHERE g.torneio_id = ?
      `, [torneioId]);
  
      return response.status(200).json(grupos[0]);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro ao listar os grupos.' });
    }
  }
  
}

module.exports = GrupoController;
