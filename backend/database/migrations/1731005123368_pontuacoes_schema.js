// start/migrations/xxxx_create_pontuacao_table.js

const Schema = use('Schema')

class PontuacaoSchema extends Schema {
  up () {
    this.create('pontuacoes', (table) => {
      table.increments('id')
      table.integer('torneio_id').unsigned().references('id').inTable('torneios')
      table.integer('entidade_id').unsigned().notNullable()
      table.integer('pontos').defaultTo(0)
      table.index(['torneio_id', 'entidade_id'], 'idx_pontuacao_torneio_entidade')
    })
  }

  down () {
    this.drop('pontuacoes')
  }
}

module.exports = PontuacaoSchema
