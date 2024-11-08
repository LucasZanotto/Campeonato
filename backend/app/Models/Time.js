'use strict'

const Model = use('Model')

class Time extends Model {
  atletas() {
    return this.hasMany('App/Models/Atleta')
  }

  partidas() {
    return this.hasManyThrough('App/Models/Partida', 'App/Models/PartidaRelacionamento', 'competidor_1_id', 'id')
      .orWhere('App/Models/PartidaRelacionamento', 'competidor_2_id', 'id')
      .where('competidor_tipo', 'time')
  }
}

module.exports = Time
