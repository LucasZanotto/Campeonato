const Model = use("Model");

class Partida extends Model {
  torneio() {
    return this.belongsTo("App/Models/Torneio");
  }

  oponente1() {
    return this.belongsTo("App/Models/Time", "oponente1_id", "id").union(
      this.belongsTo("App/Models/Atleta", "oponente1_id", "id")
    );
  }

  oponente2() {
    return this.belongsTo("App/Models/Time", "oponente2_id", "id").union(
      this.belongsTo("App/Models/Atleta", "oponente2_id", "id")
    );
  }
}

module.exports = Partida;
