// app/Controllers/Http/AtletaController.js

const Atleta = use('App/Models/Atleta')

const Database = use('Database');

class AtletaController {
  
  async create({ request, response }) {
    const { nome, time_id } = request.only(['nome', 'time_id']);

    try {
      const atletaId = await Database.table('Atleta').insert({ nome, time_id });
      return response.json({ id: atletaId[0], message: 'Atleta criado com sucesso!' });
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar atleta', details: error.message });
    }
  }

  // Atualiza as informações de um Atleta
async atualizarAtleta({ params, request, response }) {
  try {
    const { nome, time_id, eliminado } = request.only(['nome', 'time_id', 'eliminado']);
    const { atletaId } = params; // ID do atleta a ser atualizado

    const updateQuery = `
      UPDATE Atleta
      SET nome = ?, time_id = ?, eliminado = ?
      WHERE id = ?
    `;

    await Database.raw(updateQuery, [nome, time_id, eliminado, atletaId]);

    return response.status(200).json({
      message: 'Atleta atualizado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao atualizar atleta:', error);
    return response.status(500).json({
      message: 'Erro ao atualizar atleta',
      error: error.message,
    });
  }
}

}

module.exports = AtletaController
