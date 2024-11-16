// app/Controllers/Http/PartidaController.js

const Partida = use('App/Models/Partida')

class PartidaController {
  async index({ response }) {
    const partidas = await Partida.all()
    return response.json(partidas)
  }

  async store({ request, response }) {
    const data = request.only(['torneio_id', 'oponente1_id', 'oponente2_id', 'oponente1_pontos', 'oponente2_pontos', 'em_andamento'])
    const partida = await Partida.create(data)
    return response.status(201).json(partida)
  }
}

module.exports = PartidaController
