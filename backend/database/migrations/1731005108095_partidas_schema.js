// start/migrations/xxxx_create_partida_table.js

const Schema = use('Schema')

class PartidaSchema extends Schema {
  up () {
    this.create('partidas', (table) => {
      table.increments('id')
      table.integer('torneio_id').unsigned().references('id').inTable('torneios')
      table.integer('oponente1_id').unsigned().notNullable()
      table.integer('oponente2_id').unsigned().notNullable()
      table.integer('oponente1_pontos').defaultTo(0)
      table.integer('oponente2_pontos').defaultTo(0)
      table.boolean('em_andamento').defaultTo(true)
      table.timestamps()
      table.index(['torneio_id'], 'idx_partida_torneio')
    })
  }

  down () {
    this.drop('partidas')
  }
}

module.exports = PartidaSchema
