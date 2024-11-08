'use strict'

const Model = use('Model')

class Atleta extends Model {
  // Relacionamento com o time
  time() {
    return this.belongsTo('App/Models/Time')
  }

  // Relacionamento para partidas através da tabela `partida_relacionamentos`
  partidas() {
    return this.hasManyThrough('App/Models/Partida', 'App/Models/PartidaRelacionamento', 'competidor_1_id', 'id')
      .orWhere('App/Models/PartidaRelacionamento', 'competidor_2_id', 'id')
      .where('competidor_tipo', 'atleta')
  }
}

module.exports = Atleta
