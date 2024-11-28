// app/Controllers/Http/AtletaController.js

const Atleta = use('App/Models/Atleta')
const Database = use('Database');

class AtletaController {
  async index({ response }) {
    const atletas = await Atleta.all()
    return response.json(atletas)
  }

  async store({ request, response }) {
    const data = request.only(['nome', 'time_id'])
    const atleta = await Atleta.create(data)
    return response.status(201).json(atleta)
  }
}

module.exports = AtletaController
