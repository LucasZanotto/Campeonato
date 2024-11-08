'use strict'

const Model = use('Model')

class PartidaRelacionamento extends Model {
    static get table () {
        return 'partida_relacionamentos'  // Nome da tabela no banco de dados
      }
  partida() {
    return this.belongsTo('App/Models/Partida')
  }

  // Definindo relação condicional para o tipo de competidor (time ou atleta)
  competidor1() {
    return this.morphTo(['App/Models/Time', 'App/Models/Atleta'], 'competidor_tipo', 'competidor_1_id')
  }

  competidor2() {
    return this.morphTo(['App/Models/Time', 'App/Models/Atleta'], 'competidor_tipo', 'competidor_2_id')
  }
}

module.exports = PartidaRelacionamento
