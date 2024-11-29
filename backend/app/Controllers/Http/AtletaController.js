const Atleta = use("App/Models/Atleta");

class AtletaController {
  async index({ response }) {
    const atletas = await Atleta.all();
    return response.json(atletas);
  }

  async store({ request, response }) {
    const data = request.only(["nome", "time_id"]);
    const atleta = await Atleta.create(data);
    return response.status(201).json(atleta);
  }
}

module.exports = AtletaController;
