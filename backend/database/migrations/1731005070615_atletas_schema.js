// start/migrations/xxxx_create_atleta_table.js

const Schema = use('Schema')

class AtletaSchema extends Schema {
  up () {
    this.create('atletas', (table) => {
      table.increments('id')
      table.string('nome', 255).notNullable()
      table.integer('time_id').unsigned().references('id').inTable('times').onDelete('SET NULL')
      table.index(['time_id'], 'idx_atleta_time')
    })
  }

  down () {
    this.drop('atletas')
  }
}

module.exports = AtletaSchema
