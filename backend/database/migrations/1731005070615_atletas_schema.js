'use strict'

const Schema = use('Schema')

class AtletasSchema extends Schema {
  up () {
    this.create('atletas', (table) => {
      table.increments('id')  // id do atleta
      table.string('nome', 255).notNullable()  // nome do atleta
      table.integer('time_id').unsigned().references('id').inTable('times').onDelete('CASCADE').notNullable()  // referência ao time
      table.timestamps()  // timestamps para created_at e updated_at
    })
  }

  down () {
    this.drop('atletas')
  }
}

module.exports = AtletasSchema
