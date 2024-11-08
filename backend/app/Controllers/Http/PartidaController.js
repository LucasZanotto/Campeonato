'use strict'

const Database = use('Database')

class PartidaController {
    //  Informações sobre quais partidas o atleta participou
    async partidasDoAtleta({ params, response }) {
        const atletaId = params.id; // ID do atleta passado pela rota
        const partidas = await Database.raw(`
            SELECT p.* 
            FROM Partida p
            JOIN Atleta a ON (p.competidor1_id = a.id OR p.competidor2_id = a.id)
            WHERE a.id = ?
        `, [atletaId]);
    
        return response.json(partidas[0]); // Retorna apenas a primeira camada do array
    }

    //  Informações sobre quais partidas cada time participou
    async partidasDoTime({ params, response }) {
        const timeId = params.id; // ID do time passado pela rota
        const partidas = await Database.raw(`
            SELECT p.*, t.nome AS time_nome, t.eliminado 
            FROM Partida p
            JOIN Time t ON (p.competidor1_id = t.id OR p.competidor2_id = t.id)
            WHERE t.id = ?
        `, [timeId]);
    
        return response.json(partidas[0]);
    }
    
    async criarPartida({ request, response }) {
        try {
          const { torneio_id, competidor1_id, competidor2_id, competidor1_pontos_id, competidor2_pontos_id, fase, resultado, em_andamento } = request.only([
            'torneio_id',
            'competidor1_id',
            'competidor2_id',
            'competidor1_pontos_id',
            'competidor2_pontos_id',
            'fase',
            'resultado',
            'em_andamento'
          ]);
    
          // Query SQL pura para inserir a partida
          const insertQuery = `
            INSERT INTO Partida (torneio_id, competidor1_id, competidor2_id, competidor1_pontos_id, competidor2_pontos_id, fase, resultado, em_andamento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
    
          // Executando a query de inserção
          await Database.raw(insertQuery, [
            torneio_id,
            competidor1_id,
            competidor2_id,
            competidor1_pontos_id,
            competidor2_pontos_id,
            fase,
            resultado,
            em_andamento
          ]);
    
          return response.status(201).json({
            message: 'Partida criada com sucesso!'
          });
        } catch (error) {
          console.error('Erro ao criar partida:', error);
          return response.status(500).json({
            message: 'Erro ao criar partida',
            error: error.message
          });
        }
      }
    
    // Atualiza as informações de uma Partida
async atualizarPartida({ params, request, response }) {
    try {
      const { competidor1_pontos_id, competidor2_pontos_id, fase, resultado, em_andamento } = request.only([
        'competidor1_pontos_id',
        'competidor2_pontos_id',
        'fase',
        'resultado',
        'em_andamento'
      ]);
      const { partidaId } = params; // ID da partida a ser atualizada
  
      const updateQuery = `
        UPDATE Partida
        SET competidor1_pontos_id = ?, competidor2_pontos_id = ?, fase = ?, resultado = ?, em_andamento = ?
        WHERE id = ?
      `;
  
      await Database.raw(updateQuery, [competidor1_pontos_id, competidor2_pontos_id, fase, resultado, em_andamento, partidaId]);
  
      return response.status(200).json({
        message: 'Partida atualizada com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao atualizar partida:', error);
      return response.status(500).json({
        message: 'Erro ao atualizar partida',
        error: error.message,
      });
    }
  }
  
}

module.exports = PartidaController
