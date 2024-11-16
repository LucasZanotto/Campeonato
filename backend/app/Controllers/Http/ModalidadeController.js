// app/Controllers/Http/ModalidadeController.js

const Modalidade = use('App/Models/Modalidade')

class ModalidadeController {
  async index({ response }) {
    const modalidades = await Modalidade.all()
    return response.json(modalidades)
  }

  async store({ request, response }) {
    const data = request.only(['nome', 'tipo_modalidade'])
    const modalidade = await Modalidade.create(data)
    return response.status(201).json(modalidade)
  }
}

module.exports = ModalidadeController
