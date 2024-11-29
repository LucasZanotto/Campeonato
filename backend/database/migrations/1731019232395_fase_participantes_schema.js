const Schema = use("Schema");

class FaseParticipantesSchema extends Schema {
  up() {
    this.create("fase_participantes", (table) => {
      table.increments("id");
      table
        .integer("fase_id")
        .unsigned()
        .references("id")
        .inTable("fases")
        .onDelete("CASCADE")
        .notNullable();
      table.integer("participante_id").unsigned().notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("fase_participantes");
  }
}

module.exports = FaseParticipantesSchema;
