// database/seeders/TorneioSeeder.js

const Factory = use('Factory')
const Torneio = use('App/Models/Torneio')

class TorneioSeeder {
  async run() {
    await Torneio.createMany([
      { nome: 'Campeonato de Futebol', modalidade_id: 1, tipo_torneio: 'pontos corridos', fase_atual: null, em_andamento: 1 },
      { nome: 'Torneio de Tênis', modalidade_id: 2, tipo_torneio: 'eliminatório', fase_atual: 'oitavas', em_andamento: 1 }
    ])
  }
}

module.exports = TorneioSeeder
