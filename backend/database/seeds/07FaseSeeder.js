const Factory = use('Factory')
const Fase = use('App/Models/Fase')

class FaseSeeder {
  async run () {
    // Inserir dados nas fases
    await Fase.createMany([
      {
        torneio_id: 1,
        fase: 'grupos',
        oponente1_id: 1,
        oponente2_id: 2,
        vencedor_id: null,
        em_andamento: true
      },
      {
        torneio_id: 1,
        fase: 'oitavas',
        oponente1_id: 3,
        oponente2_id: 4,
        vencedor_id: null,
        em_andamento: true
      }
    ])
  }
}

module.exports = FaseSeeder
