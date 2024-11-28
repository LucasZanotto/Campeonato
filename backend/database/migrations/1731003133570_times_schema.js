// start/migrations/xxxx_create_time_table.js

const Schema = use('Schema')

class TimeSchema extends Schema {
  up () {
    this.create('times', (table) => {
      table.increments('id')
      table.string('nome', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('times')
  }
}

module.exports = TimeSchema
