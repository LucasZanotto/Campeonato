// app/Controllers/Http/TorneioController.js

const Torneio = use('App/Models/Torneio')

class TorneioController {
  async index({ response }) {
    const torneios = await Torneio.all()
    return response.json(torneios)
  }

  async store({ request, response }) {
    const data = request.only(['nome', 'modalidade_id', 'tipo_torneio', 'fase_atual', 'em_andamento'])
    const torneio = await Torneio.create(data)
    return response.status(201).json(torneio)
  }
}

module.exports = TorneioController
