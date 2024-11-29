const Model = use("Model");

class Modalidade extends Model {
  torneios() {
    return this.hasMany("App/Models/Torneio");
  }
}

module.exports = Modalidade;
