// app/Controllers/Http/TimeController.js

const Time = use('App/Models/Time')
const Database = use('Database');

class TimeController {
    //    Atletas que estão em um determinado time
    async atletasDoTime({ params, response }) {
        const timeId = params.id; // ID do time passado pela rota
        const atletas = await Database.raw(`
        SELECT a.nome
FROM Atleta a
WHERE a.time_id = ?;
    `, [timeId]);

        return response.json(atletas[0]);
    }

    async create({ request, response }) {
        const { nome } = request.only(['nome']);
    
        try {
          const timeId = await Database.table('Time').insert({ nome });
          return response.json({ id: timeId[0], message: 'Time criado com sucesso!' });
        } catch (error) {
          return response.status(500).json({ error: 'Erro ao criar time', details: error.message });
        }
      }

// Atualiza as informações de um Time
async atualizarTime({ params, request, response }) {
    try {
      const { nome, eliminado } = request.only(['nome', 'eliminado']);
      const { timeId } = params; // ID do time a ser atualizado
  
      // Verificando se o nome e eliminado são passados corretamente
      console.log('Valores:', nome, eliminado, timeId);
  
      const updateQuery = `
        UPDATE Time
        SET nome = ?, eliminado = ?
        WHERE id = ?
      `;
  
      // Passando os valores corretamente para a query
      await Database.raw(updateQuery, [nome, eliminado, timeId]);
  
      return response.status(200).json({
        message: 'Time atualizado com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao atualizar time:', error);
      return response.status(500).json({
        message: 'Erro ao atualizar time',
        error: error.message,
      });
    }
  }

  async listarTimes({ response }) {
    try {
      const times = await Database
        .select('*') // Seleciona todas as colunas
        .from('Time') // Nome da tabela de times

      return response.status(200).json(times) // Retorna os times como JSON
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao buscar times', error })
    }
  }
}

module.exports = TimeController
