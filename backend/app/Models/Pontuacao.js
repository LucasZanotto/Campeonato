const Model = use("Model");

class Pontuacao extends Model {
  static get table() {
    return "pontuacoes";
  }

  torneio() {
    return this.belongsTo("App/Models/Torneio");
  }

  entidade() {
    return this.belongsTo("App/Models/Time", "entidade_id", "id").union(
      this.belongsTo("App/Models/Atleta", "entidade_id", "id")
    );
  }
}

module.exports = Pontuacao;
