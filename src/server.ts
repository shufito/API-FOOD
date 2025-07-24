import fastify from "fastify";
import cors, { fastifyCors } from "@fastify/cors";
import { Ingredientes } from "./routes/ingredientes";

const app = fastify({
  logger: true,
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(Ingredientes, { prefix: "ingredientes" });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
