const Schema = use("Schema");

class FaseSchema extends Schema {
  up() {
    this.create("fases", (table) => {
      table.increments("id");
      table
        .integer("torneio_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("torneios");
      table
        .enum("fase", ["grupos", "oitavas", "quartas", "semi", "final"])
        .notNullable();
      table.boolean("em_andamento").defaultTo(true);
      table.timestamps();
      table.index(["torneio_id", "fase"], "idx_fase_torneio_fase");
    });
  }

  down() {
    this.drop("fases");
  }
}

module.exports = FaseSchema;
