'use strict'

const Schema = use('Schema')

class PartidaRelacionamentosSchema extends Schema {
  up () {
    this.create('partida_relacionamentos', (table) => {
      table.increments('id')  // ID do relacionamento
      table.integer('partida_id').unsigned().references('id').inTable('partidas').onDelete('CASCADE')  // Referência à partida
      table.enum('competidor_tipo', ['time', 'atleta']).notNullable()  // Tipo do competidor (time ou atleta)
      
      // Definindo IDs dos competidores (um em cada "lado" da partida)
      table.integer('competidor_1_id').unsigned().notNullable()  // ID do primeiro competidor
      table.integer('competidor_2_id').unsigned().notNullable()  // ID do segundo competidor

      // Pontuação dos competidores
      table.integer('competidor_1_pontos').defaultTo(0).notNullable()
      table.integer('competidor_2_pontos').defaultTo(0).notNullable()
      
      table.timestamps()
    })
  }

  down () {
    this.drop('partida_relacionamentos')
  }
}

module.exports = PartidaRelacionamentosSchema
