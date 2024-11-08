'use strict'

const Modalidade = use('App/Models/Modalidade')

class ModalidadeSeeder {
  async run () {
    await Modalidade.createMany([
      { nome: 'Futebol', tipo: 'equipe' },
      { nome: 'Tênis', tipo: 'individual' },
      { nome: 'Vôlei', tipo: 'equipe' },
      { nome: 'Corrida', tipo: 'individual' }
    ])
  }
}

module.exports = ModalidadeSeeder
