'use strict'

const Factory = use('Factory')
const Competicao = use('App/Models/Competicao')

class CompeticaoSeeder {
  async run () {
    await Competicao.create({
      nome: 'Campeonato Brasileiro',
      tipo: 'pontos_corridos', // ou 'classificatoria'
      modalidade_id: 1, // Supondo que a modalidade com id 1 já existe
      em_andamento: 1, // Competição ainda em andamento
    })
  }
}

module.exports = CompeticaoSeeder
