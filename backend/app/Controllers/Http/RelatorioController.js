'use strict'

const Database = use('Database');

class RelatorioController {
    // Consultar partidas de um atleta
    async getPartidasAtleta({ params, response }) {
      const { atleta_id } = params
  
      try {
        const partidas = await Database.raw(`
          SELECT p.id, p.tipo, p.vencedor, pr.time1_id, pr.time2_id
          FROM partidas p
          JOIN partida_relacionamentos pr ON pr.partida_id = p.id
          WHERE pr.atleta_id = ?`, [atleta_id])
  
        return response.status(200).send(partidas[0])
      } catch (error) {
        return response.status(500).send({ error: 'Erro ao obter partidas do atleta', message: error.message })
      }
    }
  
    // Consultar partidas de um time
    async getPartidasTime({ params, response }) {
      const { time_id } = params
  
      try {
        const partidas = await Database.raw(`
          SELECT p.id, p.tipo, p.vencedor
          FROM partidas p
          JOIN partida_relacionamentos pr ON pr.partida_id = p.id
          WHERE pr.time_id = ?`, [time_id])
  
        return response.status(200).send(partidas[0])
      } catch (error) {
        return response.status(500).send({ error: 'Erro ao obter partidas do time', message: error.message })
      }
    }
  
    // Consultar a pontuação de um time em uma competição
    async getPontuacaoCompeticao({ params, response }) {
      const { time_id, competicao_id } = params
  
      try {
        const pontuacao = await Database.raw(`
          SELECT SUM(pontos) as total_pontos
          FROM pontuacoes
          WHERE time_id = ? AND competicao_id = ?`, [time_id, competicao_id])
  
        return response.status(200).send(pontuacao[0][0])
      } catch (error) {
        return response.status(500).send({ error: 'Erro ao obter pontuação do time', message: error.message })
      }
    }
  
    // Consultar número de atletas em um time
    async getNumeroAtletasTime({ params, response }) {
      const { time_id } = params
  
      try {
        const numeroAtletas = await Database.raw(`
          SELECT COUNT(*) as total_atletas
          FROM atletas
          WHERE time_id = ?`, [time_id])
  
        return response.status(200).send(numeroAtletas[0][0])
      } catch (error) {
        return response.status(500).send({ error: 'Erro ao contar atletas no time', message: error.message })
      }
    }
  
    // Consultar pontuação de um time no placar global de todas as competições
    async getPontuacaoGlobal({ params, response }) {
      const { time_id } = params
  
      try {
        const pontuacaoGlobal = await Database.raw(`
          SELECT SUM(pontos) as total_pontos
          FROM pontuacoes
          WHERE time_id = ?`, [time_id])
  
        return response.status(200).send(pontuacaoGlobal[0][0])
      } catch (error) {
        return response.status(500).send({ error: 'Erro ao obter pontuação global do time', message: error.message })
      }
    }
  }
  
  module.exports = RelatorioController
  