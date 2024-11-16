// app/Controllers/Http/PontuacaoController.js

const Pontuacao = use('App/Models/Pontuacao')

class PontuacaoController {
  async index({ response }) {
    const pontuacoes = await Pontuacao.all()
    return response.json(pontuacoes)
  }

  async store({ request, response }) {
    const data = request.only(['torneio_id', 'entidade_id', 'pontos'])
    const pontuacao = await Pontuacao.create(data)
    return response.status(201).json(pontuacao)
  }
}

module.exports = PontuacaoController
