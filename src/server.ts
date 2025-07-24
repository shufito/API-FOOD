import fastify from "fastify";
import cors from "@fastify/cors";
import { Ingredientes } from "./routes/ingredientes";

async function init() {
  const app = fastify();

  await app.register(cors, {
    origin: true,
  });

  app.register(Ingredientes, { prefix: "ingredientes" });

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
  });
}

init();
