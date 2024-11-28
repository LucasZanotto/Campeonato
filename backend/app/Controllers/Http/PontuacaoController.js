// app/Controllers/Http/PontuacaoController.js
const Database = use('Database');
const Pontuacao = use('App/Models/Pontuacao');

class PontuacaoController {
  async index({ response }) {
    const pontuacoes = await Pontuacao.all()
    return response.json(pontuacoes)
  }

  async store({ request, response }) {
    const data = request.only(['torneio_id', 'entidade_id', 'pontos'])
    const pontuacao = await Pontuacao.create(data)
    return response.status(201).json(pontuacao)
  }

  async pontosCorridosAtleta({ params, response }) {
    try {
      const { torneio_id } = params;

      // Realiza a consulta SQL bruta para buscar as pontuações dos atletas no torneio
      const pontuacoes = await Database.raw(`
        SELECT 
          atletas.id AS atleta_id,
          atletas.nome AS nome_atleta,
          SUM(pontuacoes.pontos) AS total_pontos
        FROM pontuacoes
        JOIN atletas ON pontuacoes.entidade_id = atletas.id
        WHERE pontuacoes.torneio_id = ?
        GROUP BY atletas.id
        ORDER BY total_pontos DESC
      `, [torneio_id]);

      // Retorna os dados em formato JSON
      return response.json(pontuacoes[0]);  // O resultado da query fica no índice 0
    } catch (error) {
      console.error('Erro ao buscar pontuação:', error);
      return response.status(500).send('Erro ao buscar pontuação');
    }
  }

  async pontosCorridosTime({ params, response }) {
    try {
      const { torneio_id } = params; // Pega o torneio_id da URL

      // Executa a consulta SQL para buscar os pontos dos times
      const pontuacoesTimes = await Database.raw(`
        SELECT 
          times.id AS time_id,
          times.nome AS nome_time,
          SUM(pontuacoes.pontos) AS total_pontos
        FROM pontuacoes
        JOIN times ON pontuacoes.entidade_id = times.id
        WHERE pontuacoes.torneio_id = ?
        GROUP BY times.id
        ORDER BY total_pontos DESC
      `, [torneio_id]);

      // Retorna os dados dos times em formato JSON
      return response.json(pontuacoesTimes[0]);
    } catch (error) {
      console.error('Erro ao buscar pontuação dos times:', error);
      return response.status(500).send('Erro ao buscar pontuação dos times');
    }
  }

  async pontuacao({ params, response }) {
    const torneioId = params.id;
    let pontuacoes;

    try {
      // Carregar o torneio para determinar o tipo de modalidade
      const torneio = await Database.from('torneios')
        .where('id', torneioId)
        .first();

      if (!torneio) {
        return response.status(404).json({ message: 'Torneio não encontrado' });
      }

      // Buscar a modalidade do torneio
      const modalidade = await Database.from('modalidades')
        .where('id', torneio.modalidade_id)
        .first();

      if (!modalidade) {
        return response.status(404).json({ message: 'Modalidade não encontrada' });
      }

      // Dependendo da modalidade, buscamos as pontuações
      if (modalidade.tipo_modalidade === 'equipe') {
        // Para equipes
        pontuacoes = await Database.raw(`
          SELECT 
            times.id AS time_id,
            times.nome AS nome_time,
            SUM(pontuacoes.pontos) AS total_pontos
          FROM pontuacoes
          JOIN times ON pontuacoes.entidade_id = times.id
          WHERE pontuacoes.torneio_id = ?
          GROUP BY times.id
          ORDER BY total_pontos DESC
        `, [torneioId]);
      } else if (modalidade.tipo_modalidade === 'individual') {
        // Para atletas
        pontuacoes = await Database.raw(`
          SELECT 
            atletas.id AS atleta_id,
            atletas.nome AS nome_atleta,
            SUM(pontuacoes.pontos) AS total_pontos
          FROM pontuacoes
          JOIN atletas ON pontuacoes.entidade_id = atletas.id
          WHERE pontuacoes.torneio_id = ?
          GROUP BY atletas.id
          ORDER BY total_pontos DESC
        `, [torneioId]);
      }

      return response.json(pontuacoes[0]);
    } catch (error) {
      console.error('Erro ao buscar pontuação:', error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = PontuacaoController
