const Model = use("Model");

class Fase extends Model {
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

  vencedor() {
    return this.belongsTo("App/Models/Time", "vencedor_id", "id").union(
      this.belongsTo("App/Models/Atleta", "vencedor_id", "id")
    );
  }
}

module.exports = Fase;
