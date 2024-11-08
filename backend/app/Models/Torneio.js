'use strict'

const Model = use('Model')

class Torneio extends Model {
  static get table () {
    return 'torneios'
  }

  modalidade () {
    return this.belongsTo('App/Models/Modalidade')
  }
}

module.exports = Torneio
