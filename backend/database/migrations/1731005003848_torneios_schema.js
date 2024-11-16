// start/migrations/xxxx_create_torneio_table.js

const Schema = use('Schema')

class TorneioSchema extends Schema {
  up () {
    this.create('torneios', (table) => {
      table.increments('id')
      table.string('nome', 255).notNullable()
      table.integer('modalidade_id').unsigned().references('id').inTable('modalidades')
      table.enum('tipo_torneio', ['pontos corridos', 'eliminatório']).notNullable()
      table.enum('fase_atual', ['grupos', 'oitavas', 'quartas', 'semi', 'final']).nullable()
      table.boolean('em_andamento').defaultTo(true)
    })
  }

  down () {
    this.drop('torneios')
  }
}

module.exports = TorneioSchema
