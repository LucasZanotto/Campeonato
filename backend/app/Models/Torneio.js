const Model = use("Model");

class Torneio extends Model {
  modalidade() {
    return this.belongsTo("App/Models/Modalidade");
  }

  partidas() {
    return this.hasMany("App/Models/Partida");
  }

  pontuacoes() {
    return this.hasMany("App/Models/Pontuacao");
  }

  fases() {
    return this.hasMany("App/Models/Fase");
  }
}

module.exports = Torneio;
