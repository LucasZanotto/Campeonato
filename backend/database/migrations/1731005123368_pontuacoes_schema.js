'use strict'

const Schema = use('Schema')

class PontuacoesSchema extends Schema {
  up () {
    this.create('pontuacoes', (table) => {
      table.increments('id')  // id da pontuação
      table.integer('time_id').unsigned().references('id').inTable('times').onDelete('CASCADE').notNullable()  // referência ao time
      table.integer('partida_id').unsigned().references('id').inTable('partidas').onDelete('CASCADE').notNullable()  // referência à partida
      table.enum('tipo', ['vitoria', 'empate', 'derrota']).notNullable()  // tipo de resultado
      table.timestamps()  // timestamps para created_at e updated_at
    })
  }

  down () {
    this.drop('pontuacoes')
  }
}

module.exports = PontuacoesSchema
