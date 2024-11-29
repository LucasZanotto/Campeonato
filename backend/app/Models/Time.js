const Model = use("Model");

class Time extends Model {
  static get table() {
    return "times";
  }

  atletas() {
    return this.hasMany("App/Models/Atleta");
  }

  pontuacoes() {
    return this.hasMany("App/Models/Pontuacao", "id", "entidade_id");
  }

  partidasComoOponente1() {
    return this.hasMany("App/Models/Partida", "id", "oponente1_id");
  }

  partidasComoOponente2() {
    return this.hasMany("App/Models/Partida", "id", "oponente2_id");
  }
}

module.exports = Time;
