import { z } from "zod";

export const AlimentoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  marca: z.string().nullable(),
  descricao: z.string().optional(), // ou "descrição" se for manter acento
  porcao: z.string(),
  calorias: z.string(),
  imagem: z.string().url(),
  macros: z.object({
    gordura: z.string(),
    carboidrato: z.string(),
    proteina: z.string(),
  }),
  fatos_nutricionais: z.object({
    gordura_total: z.string(),
    gordura_saturada: z.string(),
    gordura_trans: z.string().nullable(),
    colesterol: z.string(),
    sodio: z.string(),
    carboidrato_total: z.string(),
    fibra_dietetica: z.string(),
    acucares: z.string(),
    proteina: z.string(),
    vitamina_d: z.string(),
    calcio: z.string(),
    ferro: z.string(),
    potassio: z.string(),
  }),
  alergenicos: z.object({
    nao_contem: z.array(z.string()),
    contem: z.array(z.string()),
  }),
  adequacoes: z.object({
    vegetariano: z.boolean(),
    vegano: z.boolean(),
  }),
});

export type Alimento = z.infer<typeof AlimentoSchema>;

export const AlimentoQuerySchema = z.object({
  nome: z.string().optional(), // filtro por nome parcial
  imagem: z.string().optional(),
  vegano: z.enum(["true", "false"]).optional(), // filtro booleano
  vegetariano: z.enum(["true", "false"]).optional(),
});

export type AlimentoQuery = z.infer<typeof AlimentoQuerySchema>;
