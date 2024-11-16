// database/seeders/PontuacaoSeeder.js

const Factory = use('Factory')
const Pontuacao = use('App/Models/Pontuacao')

class PontuacaoSeeder {
  async run() {
    await Pontuacao.createMany([
      { torneio_id: 1, entidade_id: 1, pontos: 3 },
      { torneio_id: 1, entidade_id: 2, pontos: 2 },
      { torneio_id: 1, entidade_id: 3, pontos: 4 },
      { torneio_id: 1, entidade_id: 4, pontos: 2 }
    ])
  }
}

module.exports = PontuacaoSeeder
