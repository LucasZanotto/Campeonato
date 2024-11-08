'use strict'

const Torneio = use('App/Models/Torneio')
const Database = use('Database');

class TorneioController {
  //Informações sobre quais torneios o atleta participou
  async torneiosDoAtleta({ params, response }) {
    const atletaId = params.id; // ID do atleta passado pela rota
    const torneios = await Database.raw(`
        SELECT DISTINCT t.* 
        FROM Torneio t
        JOIN Partida p ON p.torneio_id = t.id
        WHERE p.competidor1_id = ? OR p.competidor2_id = ?
    `, [atletaId, atletaId]);

    return response.json(torneios[0]);
  }

  //  Informações sobre quais torneios cada time participou
  async torneiosDoTime({ params, response }) {
    const timeId = params.id; // ID do time passado pela rota
    const torneios = await Database.raw(`
      SELECT DISTINCT t.* 
      FROM Torneio t
      JOIN Partida p ON p.torneio_id = t.id
      WHERE p.competidor1_id = ? OR p.competidor2_id = ?
  `, [timeId, timeId]);

    return response.json(torneios[0]);
  }

  async criarTorneio({ request, response }) {
    const { nome, modalidade_id, tipo, competidor_id, em_andamento } = request.only([
      'nome',
      'modalidade_id',
      'tipo',
      'competidor_id',
      'em_andamento'
    ]);

    try {
      // Inserindo o torneio na tabela
      const [id] = await Database
        .table('Torneio')
        .insert({
          nome,
          modalidade_id,
          tipo,
          competidor_id,
          em_andamento
        });

      // Retornando os dados do torneio criado
      const torneioCriado = await Database
        .table('Torneio')
        .where('id', id)
        .first();

      return response.status(201).json({
        message: 'Torneio criado com sucesso!',
        data: torneioCriado
      });
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      return response.status(500).json({
        message: 'Erro ao criar torneio',
        error: error.message
      });
    }
  }

  // Atualiza as informações de um Torneio
async atualizarTorneio({ params, request, response }) {
  try {
    const { nome, modalidade_id, tipo, em_andamento } = request.only(['nome', 'modalidade_id', 'tipo', 'em_andamento']);
    const { torneioId } = params; // ID do torneio a ser atualizado

    const updateQuery = `
      UPDATE Torneio
      SET nome = ?, modalidade_id = ?, tipo = ?, em_andamento = ?
      WHERE id = ?
    `;

    await Database.raw(updateQuery, [nome, modalidade_id, tipo, em_andamento, torneioId]);

    return response.status(200).json({
      message: 'Torneio atualizado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao atualizar torneio:', error);
    return response.status(500).json({
      message: 'Erro ao atualizar torneio',
      error: error.message,
    });
  }
}

async index({ response }) {
  try {
    const torneios = await Database
      .select('*') // Seleciona todas as colunas
      .from('Time') // Nome da tabela de times

    return response.status(200).json(torneios) // Retorna os times como JSON
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Erro ao buscar times', error })
  }
}

async partidasDoTorneio({ params, response }) {
  try {
    const { id } = params;  // id do torneio que vem da URL
    const partidas = await Database
      .select('*')
      .from('Partida')
      .where('torneio_id', id);  // Filtra as partidas pelo id do torneio

    if (partidas.length === 0) {
      return response.status(404).json({ message: 'Nenhuma partida encontrada para este torneio.' });
    }

    return response.status(200).json(partidas);  // Retorna as partidas do torneio
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Erro ao buscar partidas do torneio.', error });
  }
}

}

module.exports = TorneioController
