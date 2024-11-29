const Torneio = use("App/Models/Torneio");
const Database = use("Database");

class TorneioController {
  async index({ response }) {
    const torneios = await Torneio.all();
    return response.json(torneios);
  }

  async store({ request, response }) {
    const data = request.only([
      "nome",
      "modalidade_id",
      "tipo_torneio",
      "fase_atual",
      "em_andamento",
    ]);
    const torneio = await Torneio.create(data);
    return response.status(201).json(torneio);
  }

  async faseDoTorneio({ params, response }) {
    try {
      const { torneio_id, fase } = params;
      console.log("Parametros recebidos:", { torneio_id, fase });

      const vencedores = await Database.raw(
        `
        SELECT COALESCE(times.nome, atletas.nome) AS vencedor
        FROM fases
        LEFT JOIN times ON fases.vencedor_id = times.id
        LEFT JOIN atletas ON fases.vencedor_id = atletas.id
        WHERE fases.torneio_id = ? AND fases.fase = ?
      `,
        [torneio_id, fase]
      );

      if (vencedores[0].length === 0) {
        return response
          .status(404)
          .json({ message: "Nenhum vencedor encontrado para a fase." });
      }

      return response.json(vencedores[0]);
    } catch (error) {
      console.error("Erro ao buscar vencedor:", error);
      return response.status(500).send("Erro ao buscar vencedor");
    }
  }

  async getTorneiosPorTipo({ request, response }) {
    try {
      const { tipo } = request.post();

      if (!["pontos corridos", "eliminatório"].includes(tipo)) {
        return response.status(400).json({ error: "Tipo de torneio inválido" });
      }

      const torneios = await Database.from("torneios")
        .innerJoin("modalidades", "torneios.modalidade_id", "modalidades.id")
        .select("torneios.*", "modalidades.nome as modalidade_nome")
        .where("torneios.tipo_torneio", tipo);

      return torneios.map((torneio) => ({
        ...torneio,
        modalidade: { nome: torneio.modalidade_nome },
      }));
    } catch (error) {
      console.error("Erro ao buscar torneios:", error);
      return response.status(500).json({ error: "Erro ao buscar torneios" });
    }
  }

  async show({ params, response }) {
    const torneio = await Torneio.query().where("id", params.id).first();

    if (!torneio) {
      return response.status(404).send("Torneio não encontrado");
    }

    return response.send(torneio);
  }
}

module.exports = TorneioController;
