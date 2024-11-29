const Partida = use("App/Models/Partida");
const Database = use("Database");

class PartidaController {
  async index({ response }) {
    const partidas = await Partida.all();
    return response.json(partidas);
  }

  async store({ request, response }) {
    const { torneio_id, oponente1_id, oponente2_id } = request.only([
      "torneio_id",
      "oponente1_id",
      "oponente2_id",
    ]);

    try {
      await this.criarPontuacaoSeNecessario(oponente1_id, torneio_id);
      await this.criarPontuacaoSeNecessario(oponente2_id, torneio_id);

      const partida = await Database.table("partidas").insert({
        torneio_id,
        oponente1_id,
        oponente2_id,
        em_andamento: 1,
        oponente1_pontos: 0,
        oponente2_pontos: 0,
      });

      return response
        .status(201)
        .send({ message: "Partida criada com sucesso!", partida });
    } catch (error) {
      console.error("Erro ao criar partida:", error);
      return response.status(500).send({ message: "Erro ao criar partida" });
    }
  }

  async criarPontuacaoSeNecessario(entidade_id, torneio_id) {
    const pontuacaoExiste = await Database.table("pontuacoes")
      .where("entidade_id", entidade_id)
      .andWhere("torneio_id", torneio_id)
      .first();

    if (!pontuacaoExiste) {
      await Database.table("pontuacoes").insert({
        entidade_id,
        torneio_id,
        pontos: 0,
      });
    }
  }

  async partidasDoTorneio({ request }) {
    const { torneio_id } = request.only(["torneio_id"]);
    const partidas = await Database.from("partidas")
      .innerJoin("atletas as a1", "partidas.oponente1_id", "a1.id")
      .innerJoin("atletas as a2", "partidas.oponente2_id", "a2.id")
      .select(
        "partidas.*",
        "a1.nome as oponente1_nome",
        "a2.nome as oponente2_nome"
      )
      .where("partidas.torneio_id", torneio_id);

    return partidas;
  }

  async storeTorneio({ request, response }) {
    const { torneio_id, atleta_id_1, atleta_id_2 } = request.only([
      "torneio_id",
      "atleta_id_1",
      "atleta_id_2",
    ]);

    const torneio = await Torneio.find(torneio_id);

    if (!torneio) {
      return response.status(404).send("Torneio não encontrado");
    }

    const partida = await Partida.create({
      torneio_id,
      atleta_id_1,
      atleta_id_2,
    });

    return response.status(201).send(partida);
  }

  async indexAtleta({ params, response }) {
    const torneioId = params.torneio_id;

    const partidas = await Database.raw(
      `
    SELECT 
      p.id,
      p.torneio_id,
      a1.nome AS oponente1_nome,
      a2.nome AS oponente2_nome,
      p.oponente1_pontos,
      p.oponente2_pontos,
      p.em_andamento,
      p.created_at,
      p.updated_at
    FROM partidas p
    LEFT JOIN atletas a1 ON p.oponente1_id = a1.id
    LEFT JOIN atletas a2 ON p.oponente2_id = a2.id
    WHERE p.torneio_id = ?
  `,
      [torneioId]
    );

    return response.json(partidas[0]);
  }

  async indexTime({ params, response }) {
    const partidas = await Database.from("partidas as p")
      .leftJoin("times as t1", "p.oponente1_id", "t1.id")
      .leftJoin("times as t2", "p.oponente2_id", "t2.id")
      .where("p.torneio_id", params.torneio_id)
      .select(
        "p.id",
        "p.torneio_id",
        "t1.nome as oponente1_nome",
        "t2.nome as oponente2_nome",
        "p.oponente1_pontos",
        "p.oponente2_pontos",
        "p.em_andamento",
        "p.created_at",
        "p.updated_at"
      );

    return response.json(partidas);
  }

  async atualizarPontos({ request, params, response }) {
    try {
      const { id } = params;
      const { oponente1_pontos, oponente2_pontos } = request.only([
        "oponente1_pontos",
        "oponente2_pontos",
      ]);

      if (oponente1_pontos == null || oponente2_pontos == null) {
        return response.status(400).json({
          message: "Pontos dos oponentes devem ser informados.",
        });
      }

      const affectedRows = await Database.table("partidas")
        .where("id", id)
        .update({
          oponente1_pontos,
          oponente2_pontos,
        });

      if (affectedRows === 0) {
        return response.status(404).json({
          message: "Partida não encontrada.",
        });
      }

      return response.status(200).json({
        message: "Pontos atualizados com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar pontos:", error);
      return response.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  }

  async encerrarPartida({ params, response }) {
    const partidaId = params.id;

    try {
      const partida = await Database.table("partidas")
        .where("id", partidaId)
        .first();

      if (!partida) {
        return response
          .status(404)
          .send({ message: "Partida não encontrada." });
      }

      if (!partida.em_andamento) {
        return response
          .status(400)
          .send({ message: "A partida já está encerrada." });
      }
      await Database.table("partidas")
        .where("id", partidaId)
        .update({ em_andamento: 0 });
      const { oponente1_id, oponente2_id, oponente1_pontos, oponente2_pontos } =
        partida;

      if (!oponente1_id || !oponente2_id) {
        return response
          .status(400)
          .send({ message: "Faltam dados para calcular o resultado." });
      }

      if (oponente1_pontos > oponente2_pontos) {
        await Database.table("pontuacoes")
          .where("entidade_id", oponente1_id)
          .increment("pontos", 3);
      } else if (oponente2_pontos > oponente1_pontos) {
        await Database.table("pontuacoes")
          .where("entidade_id", oponente2_id)
          .increment("pontos", 3);
      } else {
        await Database.table("pontuacoes")
          .where("entidade_id", oponente1_id)
          .increment("pontos", 1);
        await Database.table("pontuacoes")
          .where("entidade_id", oponente2_id)
          .increment("pontos", 1);
      }

      return response.send({ message: "Partida encerrada com sucesso!" });
    } catch (error) {
      console.error("Erro no backend ao encerrar a partida:", error);
      return response
        .status(500)
        .send({ message: "Erro ao encerrar a partida." });
    }
  }

  async historicoPorTime({ params, response }) {
    const { time_id } = params;

    try {
      const partidas = await Database.from("partidas as p")
        .leftJoin("times as t1", "p.oponente1_id", "t1.id")
        .leftJoin("times as t2", "p.oponente2_id", "t2.id")
        .select(
          "p.id",
          "p.torneio_id",
          "t1.nome as oponente1_nome",
          "t2.nome as oponente2_nome",
          "p.oponente1_pontos",
          "p.oponente2_pontos",
          "p.em_andamento",
          "p.created_at",
          "p.updated_at"
        )
        .where("t1.id", time_id)
        .orWhere("t2.id", time_id)
        .orderBy("p.created_at", "desc");

      if (partidas.length === 0) {
        return response
          .status(404)
          .send({ message: "Nenhuma partida encontrada para este time." });
      }

      return response.status(200).json(partidas);
    } catch (error) {
      console.error("Erro ao buscar histórico de partidas do time:", error);
      return response
        .status(500)
        .send({ message: "Erro ao buscar histórico de partidas do time." });
    }
  }
}

module.exports = PartidaController;
