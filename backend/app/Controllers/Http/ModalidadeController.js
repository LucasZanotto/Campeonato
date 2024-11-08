'use strict'

const Modalidade = use('App/Models/Modalidade')
const Database = use('Database');

class ModalidadeController {
  
  async create({ request, response }) {
    const { nome, tipo } = request.only(['nome', 'tipo']);

    try {
      const modalidadeId = await Database.table('Modalidade').insert({ nome, tipo });
      return response.json({ id: modalidadeId[0], message: 'Modalidade criada com sucesso!' });
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar modalidade', details: error.message });
    }
  }

  // Atualiza as informações de uma Modalidade
async atualizarModalidade({ params, request, response }) {
  try {
    const { nome, tipo } = request.only(['nome', 'tipo']);
    const { modalidadeId } = params; // ID da modalidade a ser atualizada

    const updateQuery = `
      UPDATE Modalidade
      SET nome = ?, tipo = ?
      WHERE id = ?
    `;

    await Database.raw(updateQuery, [nome, tipo, modalidadeId]);

    return response.status(200).json({
      message: 'Modalidade atualizada com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao atualizar modalidade:', error);
    return response.status(500).json({
      message: 'Erro ao atualizar modalidade',
      error: error.message,
    });
  }
}

async index({ response }) {
  try {
    // Recupera todas as modalidades do banco de dados
    const modalidades = await Database
    .select('*') 
    .from('modalidade') 

  return response.status(200).json(modalidades) 
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Erro ao buscar modalidades', error });
  }
}

}

module.exports = ModalidadeController
