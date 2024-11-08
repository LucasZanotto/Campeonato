'use strict'

const Partida = use('App/Models/Partida')
const PartidaRelacionamento = use('App/Models/PartidaRelacionamento')
const Factory = use('Factory')

class PartidaSeeder {
  async run () {
    const competicao = await Factory.model('App/Models/Competicao').create()

    const partida1 = await Partida.create({
      competicao_id: competicao.id,
      tipo: 'PartidaPontosCorridos',
      em_andamento: 1,
    })

    await PartidaRelacionamento.create({
      partida_id: partida1.id,
      time_id: 1, // Exemplo: Time 1
      atleta_id: 2, // Exemplo: Atleta 2
      pontos: 10,
    })
  }
}

module.exports = PartidaSeeder
