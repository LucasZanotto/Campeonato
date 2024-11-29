const Schema = use("Schema");

class GruposSchema extends Schema {
  up() {
    this.create("grupos", (table) => {
      table.increments("id");
      table.string("nome").notNullable();
      table
        .integer("torneio_id")
        .unsigned()
        .references("id")
        .inTable("torneios")
        .onDelete("CASCADE")
        .notNullable();
      table.integer("participante_id").unsigned().notNullable();
      table.integer("pontos").defaultTo(0);
      table.boolean("em_andamento").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("grupos");
  }
}

module.exports = GruposSchema;
