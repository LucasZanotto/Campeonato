// start/migrations/xxxx_create_modalidade_table.js

const Schema = use('Schema')

class ModalidadeSchema extends Schema {
  up () {
    this.create('modalidades', (table) => {
      table.increments('id')
      table.string('nome', 255).notNullable()
      table.enum('tipo_modalidade', ['individual', 'equipe']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('modalidades')
  }
}

module.exports = ModalidadeSchema
