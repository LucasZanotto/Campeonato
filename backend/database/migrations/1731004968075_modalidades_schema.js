'use strict'

const Schema = use('Schema')

class ModalidadesSchema extends Schema {
  up () {
    this.create('modalidades', (table) => {
      table.increments('id')  // id da modalidade
      table.string('nome', 255).notNullable()  // nome da modalidade
      table.enum('tipo', ['individual', 'equipe']).notNullable()  // tipo da modalidade
      table.timestamps()  // timestamps para created_at e updated_at
    })
  }

  down () {
    this.drop('modalidades')
  }
}

module.exports = ModalidadesSchema
