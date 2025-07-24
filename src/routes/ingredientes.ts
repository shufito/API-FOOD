import { FastifyInstance } from "fastify";
import { readDB } from "../db";
import { Alimento, AlimentoQuerySchema } from "../schemas/alimento";

export async function Ingredientes(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    const parseResult = AlimentoQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).send(parseResult.error);
    }

    const { nome, imagem, vegano, vegetariano } = parseResult.data;
    const db = readDB();

    const alimentosFiltrados = db.filter((item: Alimento) => {
      let match = true;

      if (nome) {
        match = match && item.nome.toLowerCase().includes(nome.toLowerCase());
      }

      if (imagem) {
        const hasImage = imagem === "true";
        match = match && (hasImage ? !!item.imagem : !item.imagem);
      }

      if (vegano) {
        match = match && item.adequacoes.vegano === (vegano === "true");
      }

      if (vegetariano) {
        match =
          match && item.adequacoes.vegetariano === (vegetariano === "true");
      }

      return match;
    });

    return alimentosFiltrados;
  });

  app.get("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const db = readDB();
    const item = db.find((a: any) => a.id === id);
    if (!item)
      return res.status(404).send({ error: "Alimento não encontrado" });
    return item;
  });
}
