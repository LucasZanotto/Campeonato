// app/Controllers/Http/FaseController.js

const Fase = use('App/Models/Fase')
const Database = use('Database');

class FaseController {
  async index({ response }) {
    const fases = await Fase.all()
    return response.json(fases)
  }

  async store({ request, response }) {
    const data = request.only(['torneio_id', 'fase', 'oponente1_id', 'oponente2_id', 'vencedor_id', 'em_andamento'])
    const fase = await Fase.create(data)
    return response.status(201).json(fase)
  }
}

module.exports = FaseController
