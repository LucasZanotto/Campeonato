// app/Controllers/Http/ModalidadeController.js

const Modalidade = use('App/Models/Modalidade')
const Database = use('Database');

class ModalidadeController {
  async index({ response }) {
    const modalidades = await Modalidade.all()
    return response.json(modalidades)
  }

  async store({ request, response }) {
    const { nome, tipo } = request.only(['nome', 'tipo']);

    // Debug para verificar os dados recebidos
    console.log('Dados recebidos:', { nome, tipo });

    try {
      const modalidade = await Database.table('modalidades').insert({
        nome,
        tipo_modalidade: tipo // Garanta que o campo corresponde ao banco 
      });

      return response.status(201).json(modalidade);
    } catch (error) {
      console.error('Erro ao salvar modalidade:', error);
      return response.status(500).send('Erro ao criar modalidade');
    }
  }

  async indexDaModalidade({ params, response }) {
    const torneioId = params.torneio_id;

    const partidas = await Database.raw(`
    SELECT * FROM MODALIDADES WHERE tipo_modalidade = ?
  `, [torneioId]);

    return response.json(partidas[0]); // O resultado da query raw será um array de arrays, então pegamos o primeiro elemento.
  }

}

module.exports = ModalidadeController
