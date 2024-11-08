'use strict'

const Pontuacao = use('App/Models/Pontuacao')

class PontuacaoSeeder {
  async run () {
    await Pontuacao.createMany([
      { time_id: 1, partida_id: 1, tipo: 'vitoria' },
      { time_id: 2, partida_id: 2, tipo: 'vitoria' },
      { time_id: 1, partida_id: 3, tipo: 'vitoria' },
      { time_id: 2, partida_id: 4, tipo: 'vitoria' }
    ])
  }
}

module.exports = PontuacaoSeeder
