'use strict'

const Schema = use('Schema')

class CompeticoesSchema extends Schema {
  up () {
    this.create('competicoes', (table) => {
      table.increments('id')  // id da competição
      table.string('nome', 255).notNullable()  // nome da competição
      table.integer('modalidade_id').unsigned().references('id').inTable('modalidades').onDelete('CASCADE').notNullable()  // referência à tabela modalidades
      table.enum('tipo', ['pontos_corridos', 'classificatoria']).notNullable()  // tipo da competição
      table.enum('em_andamento', [0, 1]).defaultTo(1).notNullable()  // se a competição está em andamento
      table.timestamps()  // timestamps para created_at e updated_at
    })
  }

  down () {
    this.drop('competicoes')
  }
}

module.exports = CompeticoesSchema
