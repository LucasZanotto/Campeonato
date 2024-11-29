const Factory = use('Factory')
const Atleta = use('App/Models/Atleta')

class AtletaSeeder {
  async run() {
    await Atleta.createMany([
      { nome: 'Atleta 1', time_id: 1 },
      { nome: 'Atleta 2', time_id: 1 },
      { nome: 'Atleta 3', time_id: 2 },
      { nome: 'Atleta 4', time_id: 2 },
      { nome: 'Atleta 5', time_id: null },
      { nome: 'Atleta 6', time_id: null },
      { nome: 'Atleta 7', time_id: null },
      { nome: 'Atleta 8', time_id: null }
    ])
  }
}

module.exports = AtletaSeeder
