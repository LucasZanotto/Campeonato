'use strict'

const Model = use('Model')

class Pontuacao extends Model {
  static get table () {
    return 'pontuacoes'  // Nome da tabela no banco de dados
  }

  // Relacionamento com Time
  time () {
    return this.belongsTo('App/Models/Time')
  }

  // Relacionamento com Partida
  partida () {
    return this.belongsTo('App/Models/Partida')
  }
}

module.exports = Pontuacao
