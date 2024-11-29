const Factory = use('Factory')
const Modalidade = use('App/Models/Modalidade')

class ModalidadeSeeder {
  async run() {
    await Modalidade.createMany([
      { nome: 'Futebol', tipo_modalidade: 'equipe' },
      { nome: 'Tênis', tipo_modalidade: 'individual' }
    ])
  }
}

module.exports = ModalidadeSeeder
