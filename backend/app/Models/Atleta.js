// app/Models/Atleta.js

const Model = use('Model')

class Atleta extends Model {
  time() {
    return this.belongsTo('App/Models/Time')
  }

  pontuacoes() {
    return this.hasMany('App/Models/Pontuacao', 'id', 'entidade_id')
  }

  partidasComoOponente1() {
    return this.hasMany('App/Models/Partida', 'id', 'oponente1_id')
  }

  partidasComoOponente2() {
    return this.hasMany('App/Models/Partida', 'id', 'oponente2_id')
  }
}

module.exports = Atleta
