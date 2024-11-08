'use strict'

const Atleta = use('App/Models/Atleta')

class AtletaSeeder {
  async run () {
    await Atleta.create({ nome: 'Atleta 1', time_id: 1 })
    await Atleta.create({ nome: 'Atleta 2', time_id: 1 })
    await Atleta.create({ nome: 'Atleta 3', time_id: 2 })
  }
}

module.exports = AtletaSeeder
