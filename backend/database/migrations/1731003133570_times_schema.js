'use strict'

const Schema = use('Schema')

class TimesSchema extends Schema {
  up () {
    this.create('times', (table) => {
      table.increments('id')  // id do time
      table.string('nome', 255).notNullable()  // nome do time
      table.timestamps()  // timestamps para created_at e updated_at
    })
  }

  down () {
    this.drop('times')
  }
}

module.exports = TimesSchema
