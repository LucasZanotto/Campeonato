'use strict'

const Model = use('Model')

class Partida extends Model {
    static get table () {
        return 'partidas'  // Nome da tabela no banco de dados
      }
  // Relacionamento com a competição (pertence a uma competição)
  competicao() {
    return this.belongsTo('App/Models/Competicao')
  }

  // Relacionamento com os participantes (Atletas ou Times) da partida
  relacionamentos() {
    return this.hasMany('App/Models/PartidaRelacionamento')
  }

  // Relacionamento para encontrar o vencedor
  // Isso pode ser feito de forma mais robusta com relação aos modelos Atleta ou Time
  vencedorAtleta() {
    return this.belongsTo('App/Models/Atleta', 'vencedor', 'id')
  }

  vencedorTime() {
    return this.belongsTo('App/Models/Time', 'vencedor', 'id')
  }
}

module.exports = Partida
