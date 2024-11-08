'use strict'

const Model = use('Model')

class Modalidade extends Model {
  static get table () {
    return 'modalidades'  // Nome da tabela no banco de dados
  }

  // Definindo o relacionamento com Competicoes
  competicoes () {
    return this.hasMany('App/Models/Competicao')
  }
}

module.exports = Modalidade
