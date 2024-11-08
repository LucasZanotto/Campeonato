'use strict'

const Database = use('Database');

class PontuacaoController {
    // Pontuação de um time em certo torneio
    async pontuacaoDoTimeEmTorneio({ params, response }) {
        const { timeId, torneioId } = params; // IDs passados pela rota
        const pontuacao = await Database.raw(`
            SELECT t.nome AS time, tr.nome AS torneio, 
       SUM(CASE WHEN pt.tipo = 'vitoria' THEN 3
                WHEN pt.tipo = 'empate' THEN 1
                ELSE 0 END) AS pontuacao_total
            FROM Pontuacao pt
            JOIN Partida p ON pt.partida_id = p.id
            JOIN Time t ON pt.competidor_id = t.id
            JOIN Torneio tr ON p.torneio_id = tr.id
            WHERE t.id = ? AND tr.id = ?
            GROUP BY t.nome, tr.nome
        `, [timeId, torneioId]);

        return response.json(pontuacao[0]);
    }

    // Pontuação de todos os times em um torneio
    async pontuacaoTodosTimesEmTorneio({ params, response }) {
        const torneioId = params.id; // ID do torneio passado pela rota
        const pontuacoes = await Database.raw(`
            SELECT t.nome AS time, 
       SUM(CASE 
               WHEN pt.tipo = 'vitoria' THEN 3
               WHEN pt.tipo = 'empate' THEN 1
               ELSE 0 
           END) AS pontuacao_total
FROM pontuacao pt
JOIN Partida p ON pt.partida_id = p.id
JOIN Time t ON pt.competidor_id = t.id
JOIN Torneio tr ON p.torneio_id = tr.id
WHERE tr.id = ?
GROUP BY t.id
ORDER BY pontuacao_total DESC

        `, [torneioId]);

        return response.json(pontuacoes[0]);
    }

    async criarPontuacao({ request, response }) {
        const { competidor_id, partida_id, tipo } = request.only([
          'competidor_id',
          'partida_id',
          'tipo'
        ]);
    
        try {
          // Inserindo a nova pontuação
          const [id] = await Database
            .table('Pontuacao')
            .insert({
              competidor_id,
              partida_id,
              tipo
            });
    
          // Retornando os dados da pontuação criada
          const pontuacaoCriada = await Database
            .table('Pontuacao')
            .where('id', id)
            .first();
    
          return response.status(201).json({
            message: 'Pontuação criada com sucesso!',
            data: pontuacaoCriada
          });
        } catch (error) {
          console.error('Erro ao criar pontuação:', error);
          return response.status(500).json({
            message: 'Erro ao criar pontuação',
            error: error.message
          });
        }
      }

      // Atualiza as informações de Pontuação
async atualizarPontuacao({ params, request, response }) {
    try {
      const { tipo } = request.only(['tipo']);
      const { pontuacaoId } = params; // ID da pontuação a ser atualizada
  
      const updateQuery = `
        UPDATE Pontuacao
        SET tipo = ?
        WHERE id = ?
      `;
  
      await Database.raw(updateQuery, [tipo, pontuacaoId]);
  
      return response.status(200).json({
        message: 'Pontuação atualizada com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao atualizar pontuação:', error);
      return response.status(500).json({
        message: 'Erro ao atualizar pontuação',
        error: error.message,
      });
    }
  }
  
}

module.exports = PontuacaoController
