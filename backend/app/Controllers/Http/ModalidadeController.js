const Modalidade = use("App/Models/Modalidade");
const Database = use("Database");

class ModalidadeController {
  async index({ response }) {
    const modalidades = await Modalidade.all();
    return response.json(modalidades);
  }

  async store({ request, response }) {
    const { nome, tipo } = request.only(["nome", "tipo"]);

    try {
      const modalidade = await Database.table("modalidades").insert({
        nome,
        tipo_modalidade: tipo,
      });

      return response.status(201).json(modalidade);
    } catch (error) {
      console.error("Erro ao salvar modalidade:", error);
      return response.status(500).send("Erro ao criar modalidade");
    }
  }

  async indexDaModalidade({ params, response }) {
    const torneioId = params.torneio_id;

    const partidas = await Database.raw(
      `
    SELECT * FROM MODALIDADES WHERE tipo_modalidade = ?
  `,
      [torneioId]
    );

    return response.json(partidas[0]);
  }
}

module.exports = ModalidadeController;
