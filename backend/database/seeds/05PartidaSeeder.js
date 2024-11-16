// database/seeders/PartidaSeeder.js

const Factory = use('Factory')
const Partida = use('App/Models/Partida')

class PartidaSeeder {
  async run() {
    await Partida.createMany([
      { torneio_id: 1, oponente1_id: 1, oponente2_id: 2, oponente1_pontos: 3, oponente2_pontos: 1, em_andamento: 0 },
      { torneio_id: 1, oponente1_id: 3, oponente2_id: 4, oponente1_pontos: 2, oponente2_pontos: 2, em_andamento: 0 },
      { torneio_id: 1, oponente1_id: 1, oponente2_id: 3, oponente1_pontos: 0, oponente2_pontos: 1, em_andamento: 0 },
      { torneio_id: 1, oponente1_id: 2, oponente2_id: 4, oponente1_pontos: 1, oponente2_pontos: 1, em_andamento: 0 }
    ])
  }
}

module.exports = PartidaSeeder
