'use strict'

const Schema = use('Schema')

class PartidasSchema extends Schema {
  up () {
    this.create('partidas', (table) => {
      table.increments('id')  // ID da partida
      table.integer('competicao_id').unsigned().references('id').inTable('competicoes').onDelete('CASCADE')  // Referência à competição
      table.enum('tipo', ['PartidaPontosCorridos', 'PartidaClassificatoria']).notNullable()  // Tipo da partida
      table.boolean('em_andamento').defaultTo(true).notNullable()  // Status da partida
      table.integer('vencedor').unsigned().nullable()  // ID do vencedor (referencia ao ID do competidor vencedor)
      table.timestamps()
    })
  }

  down () {
    this.drop('partidas')
  }
}

module.exports = PartidasSchema
