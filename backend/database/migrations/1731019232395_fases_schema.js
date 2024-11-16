// start/migrations/xxxx_create_fase_table.js

const Schema = use('Schema')

class FaseSchema extends Schema {
  up () {
    this.create('fases', (table) => {
      table.increments('id')
      table.integer('torneio_id').unsigned().references('id').inTable('torneios')
      table.enum('fase', ['grupos', 'oitavas', 'quartas', 'semi', 'final']).notNullable()
      table.integer('oponente1_id').unsigned().notNullable()
      table.integer('oponente2_id').unsigned().notNullable()
      table.integer('vencedor_id').unsigned().nullable()
      table.boolean('em_andamento').defaultTo(true)
      table.index(['torneio_id', 'fase'], 'idx_fase_torneio_fase')  
    })
  }

  down () {
    this.drop('fases')
  }
}

module.exports = FaseSchema
